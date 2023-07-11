// Stylesheets
import './styles/Game.css';
// Components
import GameOver from './GameOver';
import WaitingForOpponent from './WaitingForOpponent';
import TurnOverlay from './TurnOverlay';
import GameBoard from './GameBoard';
// Libraries
import { useState, useEffect, useRef } from 'react';

function Game( { gameState, opponentsUsername, endTurn, stand, newGame, playCard, updateDelay=500 } ) {

    const [displayedGameState, setDisplayedGameState] = useState(gameState);

    const timedQueue = useRef((function () {
        var API;
        const queue = [];
        var task = null;
        var tHandle;

        function next() {
            if (task !== null) {
                task.func();
                task = null;
            }
            if (queue.length > 0) {
                task = queue.shift();
                tHandle = setTimeout(next, task.time)
            }
            else {
                API.done = true;
            }
        }

        return API = {
            add: function (func, time) {
                queue.push({ func: func, time: time });
            },
            start: function () {
                if (queue.length > 0 && API.done) {
                    API.done = false;
                    tHandle = setTimeout(next, 0);
                }
            },
            clear: function () {
                task = null;
                queue.length = 0;
                clearTimeout(tHandle);
                API.done = true;
            },
            done: true,
        }
    })());

    useEffect(() => {
        // Game State Creation
        const newGameState = Object.assign({}, displayedGameState, gameState); 
        if (gameState["boards"]){
            newGameState["boards"]["you"] = Object.assign({}, displayedGameState["boards"]["you"], gameState["boards"]["you"]);
            newGameState["boards"]["opponent"] = Object.assign({}, displayedGameState["boards"]["opponent"], gameState["boards"]["opponent"]);
        }

        const yourBoardSum = newGameState["boards"]["you"]["board"].reduce((x, e) => x + e.value, 0);
        const opponentsBoardSum = newGameState["boards"]["opponent"]["board"].reduce((x, e) => x + e.value, 0);
        newGameState["boards"]["you"]["boardSum"] = yourBoardSum;
        newGameState["boards"]["opponent"]["boardSum"] = opponentsBoardSum;

        // Automatic Standing
        if (yourBoardSum == 20 && !newGameState["boards"]["you"]["standing"] && !newGameState["next"]) {
            stand();
        }

        // Game State Updating
        timedQueue.current.add(() => {
            setDisplayedGameState(newGameState);
        }, 0);
        timedQueue.current.add(() => { }, updateDelay);
        timedQueue.current.start();
    }, [gameState]);

    const EndTurn = () => {
        if (timedQueue.current.done) endTurn();
    };

    const Stand = () => {
        if (timedQueue.current.done) stand();
    };

    const NewGame = () => {
        if (timedQueue.current.done) newGame();
    };

    const PlayCard = (card) => { 
        if (timedQueue.current.done) playCard(card);
    };

    return (
        <div className="Game">
            <GameOver finished={displayedGameState.finished} yourScore={displayedGameState["boards"]["you"]["points"]} 
                opponentScore={displayedGameState["boards"]["opponent"]["points"]} newGame={NewGame} />
            <WaitingForOpponent playerCount={displayedGameState.playerCount} finished={displayedGameState.finished} />
            <TurnOverlay gameState={displayedGameState} />
            <GameBoard gameState={displayedGameState} opponentsUsername={opponentsUsername} endTurn={EndTurn} stand={Stand} playCard={PlayCard}/>
        </div>
    )
}

export default Game;