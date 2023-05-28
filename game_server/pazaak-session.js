const Pazaak = require('./pazaak.js');

class PazaakSession extends Pazaak {
    constructor(privateSession = false) {
        super();
        this.privateSession = privateSession;
        this.players = {
            "Player 1": {
                "playerName": null,
                "callback": null
            }, 
            "Player 2": {
                "playerName": null,
                "callback": null
            }
        };
    }

    get currentPlayer() {
        return this.players[this.turn]["playerName"];
    }

    get playerCount() {
        let playerCount = 0;
        if (this.players["Player 1"]["playerName"]){
            playerCount++;
        }
        if (this.players["Player 2"]["playerName"]){
            playerCount++;
        }

        return playerCount;
    }

    get isPrivate() {
        return this.privateSession;
    }

    callbacks(){
        console.log(this.players);
        for (const player in this.players){
            if (this.players[player]["callback"]){
                this.players[player]["callback"](this.retrieveSessionState(player));
            }
        }
    }

    retrieveSessionState(player) {
        const otherPlayer = ["Player 1", "Player 2"].filter(role => role != player)[0];

        return {
            "players": this.players,
            "boards": {
                "you": this.boards[player],
                "opponent": {
                    "points": this.boards[otherPlayer]["points"],
                    "sidedeckSize": this.boards[otherPlayer]["sidedeck"].length,
                    "standing": this.boards[otherPlayer]["standing"],
                    "sidedeckCardPlayed": this.boards[otherPlayer]["sidedeckCardPlayed"],
                    "board": this.boards[otherPlayer]["board"]
                }
            },
            "turn": player == this.turn ? "you" : "opponent",
            "finished": this.finished,
            "playerCount": this.playerCount
        }
    }

    assignPlayer(playerName, callback = x=>x) {
        if (!this.players["Player 1"]["playerName"] && !this.players["Player 2"]["playerName"]) {
            const assignment = ["Player 1", "Player 2"][Math.round(Math.random())];
            this.players[assignment]["playerName"] = playerName;
            this.players[assignment]["callback"] = callback;
        }
        else if (!this.players["Player 1"]["playerName"]) {
            this.players["Player 1"]["playerName"] = playerName;
            this.players["Player 1"]["callback"] = callback;
        }
        else if (!this.players["Player 2"]["playerName"]) {
            this.players["Player 2"]["playerName"] = playerName;
            this.players["Player 2"]["callback"] = callback;
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
        else if (playerName == this.players["Player 2"]["playerName"]) {
            this.players["Player 2"] = {
                "playerName": null,
                "callback": null
            };
        }
        else {
            return `${playerName} is not in the game!`;
        }

        this.callbacks();
    }

    processMove(player, move) {
        if (this.finished) {
            if (move == "new game"){
                this.resetGame();
            }
            else {
                return "This game is finished!";
            }
        }

        if (player == this.currentPlayer) {
            if (move == "stand") {
                this.stand();
            }
            else if (move == "end turn") {
                this.endTurn();
            }
            else if (Object.hasOwn(move, 'value') || Number.isInteger(move)) {
                this.playCard(move);
            }
            else {
                //`${move} is not a valid move!`;
            }
        }
        else {
            //`It is not ${player}'s turn!`;
        }

        this.callbacks();
    }
}

module.exports = PazaakSession;