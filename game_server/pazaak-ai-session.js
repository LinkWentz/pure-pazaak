const PazaakSession = require('./pazaak-session.js');

class PazaakAISession extends PazaakSession{
    constructor() {
        super();
        this.privateSession = true;
        this.players["Player 2"] = {
            "playerName": "_ai",
            "callback": (gameState, label) => {
                return;
            }
        };
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

    processMove(player, move) {
        if (this.finished) {
            if (move == "new game"){
                this.resetGame();
                this.callbacks("New game");
            }
            else {
                this.callbacks("The game is finished");
            }
        }

        if (player == this.currentPlayer) {
            if (move == "stand") {
                this.callbacks(this.stand());
                this.callbacks(this.endTurn());
            }
            else if (move == "end turn") {
                this.callbacks(this.endTurn());
            }
            else if (Object.hasOwn(move, 'value') || Number.isInteger(move)) {
                this.callbacks(this.playCard(move));
            }
        }

        if (this.turn == "Player 2" && !this.finished){
            const score = this.score("Player 2");
            const board = this.boards["Player 2"];

            if (score < 17 || score > 20) {
                let cardToPlay = null;

                for (const i in board["sidedeck"]) {
                    const modifiedScore = score + board["sidedeck"][i].value;

                    if (modifiedScore <= 20 && modifiedScore >= 17) {
                        if (cardToPlay) {
                            const previousBestModifiedScore = score + cardToPlay.value;

                            if (modifiedScore > previousBestModifiedScore){
                                cardToPlay = board["sidedeck"][i];        
                            }
                        }
                        else {
                            cardToPlay = board["sidedeck"][i];
                        }
                    }
                }

                if (cardToPlay) {
                    this.callbacks(this.playCard(cardToPlay));
                    this.callbacks(this.stand());
                    this.callbacks(this.endTurn());
                }
                else {
                    this.callbacks(this.endTurn());
                }
            }
            else {
                this.callbacks(this.stand());
                this.callbacks(this.endTurn());
            }
            this.processMove();
        }
    }
}

module.exports = PazaakAISession;