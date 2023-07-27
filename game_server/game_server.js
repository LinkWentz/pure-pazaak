require('dotenv').config();

const https = require('https').createServer({key: process.env.PRIVATE_KEY, cert: process.env.CERTIFICATE}).listen(3333);
const io = require('socket.io')(https, {
    cors: {
        origin: '*'
    },
    secure: true,
    tiemout: 100000,
    transports: ["websocket"]
});

const SessionManager = require("./session-manager.js");
const sessionManager = new SessionManager();

io.on('connection', async (socket) => {
    socket.on('find-session', () => {
        const sessionName = sessionManager.findWaitingSession() || sessionManager.createSession();
        io.to(socket.id).emit('pull-into-session', sessionName);
    });

    socket.on('create-private-session', () => {
        const sessionName = sessionManager.createSession({privateSession: true});
        io.to(socket.id).emit('pull-into-session', sessionName);
    });

    socket.on('create-ai-session', () => {
        const sessionName = sessionManager.createSession({sessionName: socket.id, ai: true});
        io.to(socket.id).emit('pull-into-session', sessionName);
    });

    socket.on('join-session', (sessionName) => {
        sessionManager.addPlayerToSession(socket.id, sessionName, (gameState, label = null) => {
            socket.emit('game-state', gameState, label);
        });
        //Username Handling
        const playersInSession = sessionManager.playersInSession(sessionName);
        for (const i in playersInSession){
            io.to(playersInSession[i]).emit('username-request');
        }
    });

    socket.on('game-event', (move) => {
        sessionManager.processGameMove(socket.id, move);
    });

    socket.on('leave-session', () => {
        sessionManager.removePlayer(socket.id);
        sessionManager.endEmptySessions();
    });

    socket.on('disconnecting', () => {
        sessionManager.removePlayer(socket.id);
        sessionManager.endEmptySessions();
    });

    socket.on('username', (username) => {
        const playersOpponent = sessionManager.playersOpponent(socket.id);
        if (playersOpponent){
            socket.to(playersOpponent).volatile.emit('opponents-username', username);
        }
    });
});