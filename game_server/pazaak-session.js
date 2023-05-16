const Pazaak = require('./pazaak.js');

class PazaakSession extends Pazaak {
    constructor(privateSession = false) {
        super();
        this.privateSession = privateSession;
        this.players = {
            "Player 1": null, 
            "Player 2": null
        };
    }

    get currentPlayer() {
        return this.players[this.turn];
    }

    get playerCount() {
        let playerCount = 0;
        if (this.players["Player 1"]){
            playerCount++;
        }
        if (this.players["Player 2"]){
            playerCount++;
        }

        return playerCount;
    }

    get isPrivate() {
        return this.privateSession;
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
                    "board": this.boards[otherPlayer]["board"]
                }
            },
            "turn": player == this.turn ? "you" : "opponent",
            "finished": this.finished,
            "playerCount": this.playerCount
        }
    }

    assignPlayer(player) {
        if (!this.players["Player 1"] && !this.players["Player 2"]) {
            const assignment = ["Player 1", "Player 2"][Math.round(Math.random())];
            this.players[assignment] = player;
        }
        else if (!this.players["Player 1"]) {
            this.players["Player 1"] = player;
        }
        else if (!this.players["Player 2"]) {
            this.players["Player 2"] = player;
        }
        else {
            return "Game is full!";
        }
    }

    removePlayer(player) {
        if (player == this.players["Player 1"]) {
            this.players["Player 1"] = null;
        }
        else if (player == this.players["Player 2"]) {
            this.players["Player 2"] = null;
        }
        else {
            return `${player} is not in the game!`;
        }
    }

    processMove(player, move) {
        if (this.finished) {
            if (move == "new game"){
                this.resetGame();
            }
            else {
                return "This game is finished!";
            } 
            return;
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
                return `${move} is not a valid move!`;
            }
        }
        else {
            return `It is not ${player}'s turn!`;
        }
    }
}

module.exports = PazaakSession;