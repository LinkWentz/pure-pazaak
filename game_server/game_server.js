const PazaakSession = require("./pazaak.js");

const io = require('socket.io')(3333, {
    cors: {
        origin: '*'
    }
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
    if (Object.keys(sessions).includes(roomName)){
        return true;
    }
    else {
        return false;
    }
}

// Joining
const addPlayerToSession = (socket, roomName) => {
    createSession(roomName);
    sessions[roomName].assignPlayer(socket.id);
}

const createSession = (roomName) => {
    if(!sessionInRoom(roomName)){
        sessions[roomName] = new PazaakSession();
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
io.on('connection', socket => {
    socket.on('game-event', (move, room) => {
        processGameMove(socket, room, move);
        updatePlayers(socket);
    });

    socket.on('join-room', (roomName) => {
        createSession(roomName);
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