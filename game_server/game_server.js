const { create } = require("domain");
const PazaakSession = require("./pazaak.js");
const fs = require("fs");

const {key, cert} = (() => {
	return {
		key: fs.readFileSync(`../certs/privkey.pem`, 'utf-8'),
		cert: fs.readFileSync(`../certs/fullchain.pem`, 'utf-8')
	}
})();

const https = require('https').createServer({key, cert}).listen(3333);
const io = require('socket.io')(https, {
    cors: {
        origin: '*'
    },
    secure: true,
    tiemout: 100000,
    transports: ["websocket"]
});

const sessions = {};

// Utility
const getCurrentRoom = (socket) => {
    socketRooms =  Array.from(socket.rooms.values());

    let room = null;

    for (const i in socketRooms) {
        if (socketRooms[i] !== socket.id){
            room = socketRooms[i];
            break;
        }
    }

    return room
}

const sessionInRoom = (roomName) => {
    if (Object.keys(sessions).includes(roomName)) {
        return true;
    }
    else {
        return false;
    }
}

const generateRoomName = (length = 4) => {
    return Math.round(Math.random() * 10**length).toString().padStart(length, "0");
}

const generateNewRoomName = (length = 4) => {
    exisitingRooms = Object.keys(sessions);

    let roomName = generateRoomName(length);
    while (sessionInRoom(roomName)) {
        roomName = generateRoomName(length);
    }

    return roomName;
}

const findWaitingSession = () => {
    const existingRooms = Object.keys(sessions);

    let roomName = null;
    for (const i in existingRooms) {
        const session = sessions[existingRooms[i]];

        const freeSpaceInSession = !session.players["Player 1"] || !session.players["Player 2"];
        const sessionIsPublic = !session.isPrivate;

        if (freeSpaceInSession && sessionIsPublic) {
            roomName = existingRooms[i];
        }
    }

    return roomName;
}

// Joining
const addPlayerToSession = (socket, roomName) => {
    createSession(roomName);
    sessions[roomName].assignPlayer(socket.id);
}

const createSession = (roomName, privateSession = false) => {
    if(!sessionInRoom(roomName)) {
        sessions[roomName] = new PazaakSession(privateSession);
    }
}

const addSocketToRoom = (socket, roomName) => {
    const currentRoom = getCurrentRoom(socket);
    const newRoom = io.sockets.adapter.rooms.get(roomName);

    if (currentRoom == roomName) {
        return `Client ${socket.id} attempted to join ${roomName} but is already in it!`;
    }
    else if (newRoom == undefined || newRoom.size < 2) {
        removeSocketFromCurrentRoom(socket);
        socket.join(roomName);
        return `Client ${socket.id} joined ${roomName}`;
    } 
    else {
        return `Client ${socket.id} attempted to join ${roomName} but it is full.`;
    }
}

// Interaction
const updatePlayers = (socket) => {
    const currentRoom = getCurrentRoom(socket);
    if (sessionInRoom(currentRoom)) {
        const players = sessions[currentRoom]["players"];
        io.to(players["Player 1"]).emit('game-state', sessions[currentRoom].retrieveSessionState("Player 1"));
        io.to(players["Player 2"]).emit('game-state', sessions[currentRoom].retrieveSessionState("Player 2"));
    };
}

const processGameMove = (socket, roomName, move) => {
    if (sessionInRoom(roomName)){
        sessions[roomName].processMove(socket.id, move);
    }
}


// Leaving
const removePlayerFromCurrentSession = (socket) => {
    const currentRoom = getCurrentRoom(socket);
    if (sessionInRoom(currentRoom)){
        sessions[currentRoom].removePlayer(socket.id);
        endCurrentSessionIfEmpty(socket);
    }
}

const endCurrentSessionIfEmpty = (socket) => {
    const currentRoom = getCurrentRoom(socket);

    const roomIsEmpty = io.sockets.adapter.rooms.get(currentRoom).size < 2;
    if (sessionInRoom(currentRoom) && roomIsEmpty){
        delete sessions[currentRoom];
    }
}

const removeSocketFromCurrentRoom = (socket) => {
    const currentRoom = getCurrentRoom(socket);
    socket.leave(currentRoom);
    return `Client ${socket.id} left ${currentRoom}`;
}

// Main
io.on('connection', async (socket) => {
    socket.on('game-event', (move, roomName) => {
        processGameMove(socket, roomName, move);
        updatePlayers(socket);
    });

    socket.on('find-room', () => {
        let roomName = findWaitingSession();

        if (!roomName){
            roomName = generateNewRoomName(); 
            createSession(roomName);
        }

        io.to(socket.id).emit('pull-into-session', roomName);
    });

    socket.on('create-private-room', () => {
        const roomName = generateNewRoomName();
        createSession(roomName, privateSession = true);

        io.to(socket.id).emit('pull-into-session', roomName);
    });

    socket.on('join-room', (roomName) => {
        addPlayerToSession(socket, roomName);
        addSocketToRoom(socket, roomName);
        updatePlayers(socket);
    });

    socket.on('leave-room', () => {
        removePlayerFromCurrentSession(socket);
        updatePlayers(socket);
        removeSocketFromCurrentRoom(socket);
    });

    socket.on('disconnecting', () => {
        removePlayerFromCurrentSession(socket);
        updatePlayers(socket);
    });
});