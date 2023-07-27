// Stylesheets
import './styles/Game.css';
// Components
import GameOver from './GameOver';
import WaitingForOpponent from './WaitingForOpponent';
import TurnOverlay from './TurnOverlay';
import GameBoard from './GameBoard';
// Libraries
import { useState, useEffect, useRef } from 'react';

function Game( { gameState, opponentsUsername, endTurn, stand, newGame, playCard, updateDelay=500, automaticStanding=true } ) {

    const [displayedGameState, setDisplayedGameState] = useState(gameState);
    const [inputDisabled, setInputDisabled] = useState(false);

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
                setInputDisabled(false);
            }
        }

        return API = {
            add: function (func, time) {
                queue.push({ func: func, time: time });
            },
            start: function () {
                if (queue.length > 0 && API.done) {
                    API.done = false;
                    setInputDisabled(true);
                    tHandle = setTimeout(next, 0);
                }
            },
            clear: function () {
                task = null;
                queue.length = 0;
                clearTimeout(tHandle);
                API.done = true;
                setInputDisabled(false);
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
        if (yourBoardSum == 20 && !newGameState["boards"]["you"]["standing"] && automaticStanding) {
            stand();
        }

        // Game State Updating
        timedQueue.current.add(() => {
            setDisplayedGameState(newGameState);
        }, 0);
        timedQueue.current.add(() => { }, updateDelay);
        timedQueue.current.start();
    }, [gameState]);

    return (
        <div className="Game">
            <GameOver finished={displayedGameState.finished} yourScore={displayedGameState["boards"]["you"]["points"]} 
                opponentScore={displayedGameState["boards"]["opponent"]["points"]} newGame={newGame} />
            <WaitingForOpponent playerCount={displayedGameState.playerCount} finished={displayedGameState.finished} />
            <TurnOverlay gameState={displayedGameState} inputDisabled={inputDisabled}/>
            <GameBoard gameState={displayedGameState} opponentsUsername={opponentsUsername} endTurn={endTurn} stand={stand} playCard={playCard} inputDisabled={inputDisabled}/>
        </div>
    )
}

export default Game;