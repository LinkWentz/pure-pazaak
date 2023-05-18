const PazaakSession = require('./pazaak-session.js');

class SessionManager {
    constructor() {
        this.sessions = {};
        this.players = new Map();
    }

    get sessionNames() {
        return Object.keys(this.sessions);
    }

    playersInSession(sessionName){
        const playerNames = [];
        if(this.sessionInProgress(sessionName)){
            for (const player in this.sessions[sessionName]["players"]){
                playerNames.push(this.sessions[sessionName]["players"][player]["playerName"]);
            }
        }
        return playerNames;
    }

    playersOpponent(playerName){
        const sessionName = this.players.get(playerName);
        const playersInSession = this.playersInSession(sessionName);
        for (const i in playersInSession){
            if (playersInSession[i] !== playerName){
                return playersInSession[i];
            }
        }
    }

    sessionInProgress(sessionName) {
        if (this.sessionNames.includes(sessionName)) {
            return true;
        }
        else {
            return false;
        }
    }

    generateSessionName(length = 4) {
        return Math.round(Math.random() * 10**length).toString().padStart(length, "0");
    }

    generateNewSessionName(length = 4) {
        let sessionName = this.generateSessionName(length);
        while (this.sessionInProgress(sessionName)) {
            sessionName = this.generateSessionName(length);
        }

        return sessionName;
    }

    findWaitingSession() {
        for (const i in this.sessionNames){
            const session = this.sessions[this.sessionNames[i]];
            if (session.playerCount < 2 && !session.privateSession){
                return this.sessionNames[i];
            }
        }
        return null;
    }

    createSession({sessionName = this.generateNewSessionName(), privateSession = false}={}) {
        this.sessions[sessionName] = new PazaakSession(privateSession);
        return sessionName;
    }

    addPlayerToSession(playerName, sessionName, callback = x=>x) {
        if (!this.sessionInProgress(sessionName)){
            this.createSession({sessionName: sessionName, privateSession: true});
        }

        this.sessions[sessionName].assignPlayer(playerName, callback);
        this.players.set(playerName, sessionName);
    }

    getPlayerInformation(sessionName) {
        if (this.sessionInProgress(sessionName)) {
            const players = this.sessions[sessionName]["players"];
            return {
                [players["Player 1"]]: this.sessions[sessionName].retrieveSessionState("Player 1"),
                [players["Player 2"]]: this.sessions[sessionName].retrieveSessionState("Player 2")
            }
        };
    }

    processGameMove(playerName, move) {
        const sessionName = this.players.get(playerName);
        if (this.sessionInProgress(sessionName)){
            this.sessions[sessionName].processMove(playerName, move);
        }
    }

    removePlayer(playerName) {
        const sessionName = this.players.get(playerName);
        if (this.sessionInProgress(sessionName)){
            this.sessions[sessionName].removePlayer(playerName);
            this.players.delete(playerName);
        }
    }

    endEmptySessions() {
        const inProgressSessions = Object.keys(this.sessions);
        const occupiedSessions = new Set(this.players.values());
        const emptySessions = inProgressSessions.filter(session => {
            return !occupiedSessions.has(session);
        });

        for (const i in emptySessions){
            delete this.sessions[emptySessions[i]];
        }
    }
}

module.exports = SessionManager;