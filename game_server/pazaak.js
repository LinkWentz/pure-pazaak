class Card {
    constructor(value, type) {
        this.value = value;
        this.validTypes = ["maindeck", "sidedeck"];

        if (this.validTypes.includes(type)){
            this.type = type;
        }
        else {
            this.type = "maindeck";
        }
    }

    equals (other) {
        if (other.value) {
            return this.value == other.value;
        }
        return false;
    }
}

class Pazaak {
    constructor() {
        this.resetGame();
    }
    // Internal
    
    callbacks() {
        return;
    }

    resetGame() {
        this.boards = {
            "Player 1": {
                "points": 0,
                "standing": false,
                "sidedeck": this.generateSideDeck(),
                "sidedeckCardPlayed": false,
                "board": []
            },
            "Player 2": {
                "points": 0,
                "standing": false,
                "sidedeck": this.generateSideDeck(),
                "sidedeckCardPlayed": false,
                "board": []
            }
        };
        this.turn = "Player 1";
        this.finished = false;
        
        this.endTurn();
        this.endTurn();
    }

    resetBoards() {
        this.boards["Player 1"] = {
            ...this.boards["Player 1"],
            "board": [],
            "sidedeckCardPlayed": false,
            "standing": false
        };
        this.boards["Player 2"] = {
            ...this.boards["Player 2"],
            "board": [],
            "sidedeckCardPlayed": false,
            "standing": false
        };

        this.endTurn();
        this.endTurn();
    }

    generateSideDeck() {
        return Array.from({length: 4}, () => {
            const cardValue = Math.round(Math.random() * 5) + 1;
            const sign = Math.round(Math.random()) * 2 - 1;
            const card = cardValue * sign;
            return new Card(card, "sidedeck");
        });
    }

    switchTurn() {
        if (this.turn == "Player 1"){
            this.turn = "Player 2";
        }
        else {
            this.turn = "Player 1";
        }
    }

    dealCard(player = null) {
        const selectedCard = Math.round(Math.random() * 9) + 1;
        this.boards[player || this.turn]["board"].push(new Card(selectedCard));

        return `${selectedCard} dealt to ${player || this.turn}`;
    }

    awardPoints() {
        const player1Score = this.score("Player 1");
        const player2Score = this.score("Player 2");

        if (player1Score > 20){
            this.boards["Player 2"]["points"]++;
            return "Player 2";
        }
        else if (player2Score > 20){
            this.boards["Player 1"]["points"]++;
            return "Player 1";
        }
        else if (player1Score == player2Score){
            return "No one";
        }
        else if (player1Score > player2Score){
            this.boards["Player 1"]["points"]++;
            return "Player 1";
        }
        else {
            this.boards["Player 2"]["points"]++;
            return "Player 2";
        }
    }

    determineGameWinner() {
        const player1Won = this.boards["Player 1"]["points"] === 3;
        const player2Won = this.boards["Player 2"]["points"] === 3;
        if (player1Won || player2Won){
            this.finished = true;
            if (player1Won && player2Won){
                return "No one";
            } 
            else if (player1Won){
                return "Player 1";
            }
            else {
                return "Player 2";
            }
        }
    }

    endRound() {
        const roundWinner = this.awardPoints();
        const gameWinner = this.determineGameWinner();

        if (gameWinner) {
            return `${gameWinner} wins the game`;
        }
        else {
            this.resetBoards();
            return `${roundWinner} wins the round`;
        }
    }
    
    // Statuses
    playerStanding(player = null) {
        return this.boards[player || this.turn]["standing"];
    }
    
    score(player = null) {
        let board;
        if (player !== null){
            board = this.boards[player];
        }
        else {
            board = this.boards[this.turn];
        }
        const score = board["board"].reduce((x, e) => x + e.value, 0);
        return score;
    }

    // Moves
    playCard(card) {
        if (this.boards[this.turn]["sidedeckCardPlayed"]){
            return;
        }

        if (Number.isInteger(card)){
            card = new Card(card, "sidedeck");
        }
        
        const currentPlayerSidedeck = this.boards[this.turn]["sidedeck"];

        for (const i in currentPlayerSidedeck) {
            if (currentPlayerSidedeck[i].equals(card)){
                this.boards[this.turn]["sidedeckCardPlayed"] = true;
                currentPlayerSidedeck.splice(i, 1);
                this.boards[this.turn]["board"].push(card);

                return (`${this.turn} played ${card.value}`);
            }
        }
    }

    stand() {
        this.boards[this.turn]["standing"] = true;
        return `${this.turn} stands on ${this.score()}`;
    }

    endTurn() {
        this.boards[this.turn]["sidedeckCardPlayed"] = false;

        const playerBust = this.score() > 20;
        const bothPlayersStanding = this.playerStanding("Player 1") && this.playerStanding("Player 2");
        
        if (playerBust || bothPlayersStanding){
            return this.endRound();
        }
        
        this.switchTurn();

        if (this.playerStanding()){
            this.switchTurn();
        }

        return this.dealCard();
    }
}

module.exports = Pazaak;