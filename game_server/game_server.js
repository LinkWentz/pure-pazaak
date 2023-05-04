const PazaakSession = require("./pazaak.js");

const io = require('socket.io')(3333, {
    cors: {
        origin: '*'
    }
});

const games = {};

const endEmptyGames = (socket) => {
    const oldRooms = Array.from(socket.rooms.values());
    for (const i in oldRooms){
        const gameInRoom = Object.keys(games).includes(oldRooms[i]);
        const roomIsEmpty = io.sockets.adapter.rooms.get(oldRooms[i]).size < 2;
        if (gameInRoom && roomIsEmpty){
            delete games[oldRooms[i]];
        }
    }
}

const updatePlayers = (socket) => {
    const rooms = Array.from(socket.rooms.values())
    let room = null;
    for (const i in rooms) {
        if (Object.keys(games).includes(rooms[i])){
            room = rooms[i];
        }
    };
    io.to(games[room]["players"]["Player 1"]).emit('game-state', games[room].retrieveGameState("Player 1"));
    io.to(games[room]["players"]["Player 2"]).emit('game-state', games[room].retrieveGameState("Player 2"));
}

const addSocketToRoom = (socket, roomName) => {
    const room = io.sockets.adapter.rooms.get(roomName)
    const old_rooms = Array.from(socket.rooms.values());
    if (old_rooms.includes(roomName)) {
        console.log(`Client ${socket.id} attempted to join ${roomName} but is already in it!`);
    }
    else if (room == undefined || room.size < 2) {
        for (const i in old_rooms){
            const old_room = old_rooms[i]
            if(old_room !== socket.id) {
                socket.leave(old_room);
                console.log(`Client ${socket.id} left ${old_room}`)
            }
        }
        socket.join(roomName);
        console.log(`Client ${socket.id} joined ${roomName}`);
    } 
    else {
        console.log(`Client ${socket.id} attempted to join ${roomName} but it is full.`);
    }
}

const removeSocketFromRoom = (socket, roomName) => {
    if(roomName !== socket.id && roomName !== undefined) {
        socket.leave(roomName);
        console.log(`Client ${socket.id} left ${roomName}`);
    }
}

const createGame = (roomName) => {
    if(!Object.keys(games).includes(roomName)){
        games[roomName] = new PazaakSession();
    }
}

const addPlayerToGame = (socket, roomName) => {
    games[roomName].assignPlayer(socket.id);
}

const leaveGame = (socket) => {
    const oldRooms = Array.from(socket.rooms.values());
    for (const i in oldRooms) {
        if (Object.keys(games).includes(oldRooms[i])){
            games[oldRooms[i]].removePlayer(socket.id);
        }
    }
}

const processGameMove = (socket, room, move) => {
    games[room].processMove(socket.id, move);
}

io.on('connection', socket => {
    const gameEvent = (move, room) => {
        processGameMove(socket, room, move);
        updatePlayers(socket);
    };
    
    const joinRoom = roomName => {
        createGame(roomName);
        addPlayerToGame(socket, roomName);
        addSocketToRoom(socket, roomName);
        updatePlayers(socket);
    };
    
    const leaveRoom = roomName => {
        leaveGame(socket);
        endEmptyGames(socket);
        removeSocketFromRoom(socket, roomName);
    };
    
    const disconnecting = () => {
        leaveGame(socket);
        endEmptyGames(socket);
    };
    socket.on('game-event', gameEvent);
    socket.on('join-room', joinRoom);
    socket.on('leave-room', leaveRoom);
    socket.on('disconnecting', disconnecting);
});