const SessionManager = require("./session-manager.js");
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

    socket.on('join-session', (sessionName) => {
        console.log('?')
        sessionManager.addPlayerToSession(socket.id, sessionName, (gameState) => {
            console.log('Game State Update');
            socket.emit('game-state', gameState);
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