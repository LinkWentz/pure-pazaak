const io = require('socket.io')(3333, {
    cors: {
        origin: '*'
    }
});

const Pazaak = require("./pazaak.js");

const games = {};

const endEmptyGames = (socket) => {
    const oldRooms = Array.from(socket.rooms.values());
    for (const i in oldRooms){
        const gameInRoom = Object.keys(games).includes(oldRooms[i]);
        const roomIsEmpty = io.sockets.adapter.rooms.get(oldRooms[i]).size == 0;
        if (gameInRoom && roomIsEmpty){
            delete games[oldRooms[i]];
        }
    }
}

const leaveGame = (socket) => {
    const oldRooms = Array.from(socket.rooms.values());
    for (const i in Object.keys(games)){
        if (oldRooms.includes(Object.keys(games)[i])) {
            const players = games[Object.keys(games)[i]]["players"];
            if (players["Player 1"] == socket.id) {
                games[Object.keys(games)[i]]["players"]["Player 1"] = null; 
            }
            if (players["Player 2"] == socket.id) {
                games[Object.keys(games)[i]]["players"]["Player 2"] = null; 
            }
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

const processGameMove = (socket, room, move) => {
    if (socket.id == games[room].currentPlayer) {
        if (move == "stand") {
            games[room].stand();
        }
        else if (move == "end turn") {
            games[room].endTurn();
        }
        else if (!isNaN(move)) {
            games[room].playCard(move);
        }
        else {
            console.log(`${move} is not a valid move!`);
        }
    }
    else {
        console.log(`It is not ${socket.id}'s turn!`);
    }
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
        games[roomName] = new Pazaak();
    }
}

const addPlayerToGame = (socket, roomName) => {
    games[roomName].assignPlayer(socket.id);
}

io.on('connection', socket => {
    const gameEvent = (move, room) => {
        processGameMove(socket, room, move);
        updatePlayers(socket);
    };
    
    const joinRoom = (roomName) => {
        createGame(roomName);
        addPlayerToGame(socket, roomName);
        addSocketToRoom(socket, roomName);
        updatePlayers(socket);
        console.log(games[roomName]);
    };
    
    const leaveRoom = (roomName) => {
        leaveGame(socket);
        endEmptyGames(socket);
        removeSocketFromRoom(socket, roomName);
    };
    
    const disconnecting = () => {
        const socket_before = socket;
        leaveGame(socket);
        endEmptyGames(socket_before);
    };
    socket.on('game-event', gameEvent);
    socket.on('join-room', joinRoom);
    socket.on('leave-room', leaveRoom);
    socket.on('disconnecting', disconnecting);
});