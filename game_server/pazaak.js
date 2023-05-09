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

    dealCard() {
        const selectedCard = Math.round(Math.random() * 9) + 1;
        this.boards[this.turn]["board"].push(new Card(selectedCard));
    }

    awardPoints() {
        const player1Score = this.score("Player 1");
        const player2Score = this.score("Player 2");
        if (player1Score > 20){
            this.boards["Player 2"]["points"]++;
            return "Player 2 Won the Round!";
        }
        else if (player2Score > 20){
            this.boards["Player 1"]["points"]++;
            return "Player 1 Won the Round!";
        }
        else if (player1Score == player2Score){
            return "Round is Tied!";
        }
        else if (player1Score > player2Score){
            this.boards["Player 1"]["points"]++;
            return "Player 1 Won the Round!";
        }
        else {
            this.boards["Player 2"]["points"]++;
            return "Player 2 Won the Round!";
        }
    }

    determineGameWinner() {
        const player1Won = this.boards["Player 1"]["points"] === 3;
        const player2Won = this.boards["Player 2"]["points"] === 3;
        if (player1Won || player2Won){
            this.resetGame();
            if (player1Won && player2Won){
                return "The Game is Tied!";
            } 
            else if (player1Won){
                return "Player 1 Wins the Game!";
            }
            else {
                return "Player 2 Wins the Game!";
            }
        }
        else {
            return "No players have won!"
        }
    }

    endRound() {
        this.awardPoints();
        this.resetBoards();
        this.endTurn();
        
        this.determineGameWinner();
    }
    
    // Statuses
    playerStanding() {
        return this.boards[this.turn]["standing"];
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

    cardInSidedeck(card) {
        
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

                break;
            }
        }
    }

    stand() {
        this.boards[this.turn]["standing"] = true;
        this.endTurn();
    }

    endTurn() {
        this.boards[this.turn]["sidedeckCardPlayed"] = false;

        if (this.score() > 20){
            this.endRound();
        }
        else {
            this.switchTurn();

            if(this.playerStanding()){
                this.switchTurn();
                if (this.playerStanding()){
                    return this.endRound();
                }
            }
            this.dealCard();
        }
    }
}

class PazaakSession extends Pazaak {
    constructor() {
        super();
        this.players = {
            "Player 1": null, 
            "Player 2": null
        };
    }

    get currentPlayer() {
        return this.players[this.turn];
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
            "finished": this.finished
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