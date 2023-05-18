const PazaakSession = require('./pazaak-session.js');

class PazaakAISession extends PazaakSession{
    constructor() {
        super();
        this.privateSession = true;
        this.players["Player 2"] = {
            "playerName": "_ai",
            "callback": (gameState) => this.aiturn(gameState)
        }
    }

    assignPlayer(playerName, callback = x=>x) {
        if (!this.players["Player 1"]["playerName"]){
            this.players["Player 1"]["playerName"] = playerName;
            this.players["Player 1"]["callback"] = callback;
        }
        else {
            return "Game is full!";
        }

        this.callbacks();
    }

    removePlayer(playerName) {
        if (playerName == this.players["Player 1"]["playerName"]) {
            this.players["Player 1"] = {
                "playerName": null,
                "callback": null
            };
        }
        else {
            return `${playerName} is not in the game!`;
        }

        this.callbacks();
    }

    aiturn(gameState) {
        if (this.turn == "Player 2"){
            this.endTurn();
            this.callbacks();
        }
    }
}

module.exports = PazaakAISession;