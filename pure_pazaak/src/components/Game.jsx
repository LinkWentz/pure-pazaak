// Stylesheets
import './styles/Game.css';
// Components
import GameOver from './GameOver';
import WaitingForOpponent from './WaitingForOpponent';
import TurnOverlay from './TurnOverlay';
import GameBoard from './GameBoard';
// Libraries
import { useState, useEffect, useRef } from 'react';
// Audio
// import DrawCard from '../assets/audio/mgs_drawmain.wav';
// import LoseGame from '../assets/audio/mgs_losematch.wav';
// import LoseRound from '../assets/audio/mgs_loseset.wav';
// import PlayCard from '../assets/audio/mgs_playside.wav';
// import StartTurn from '../assets/audio/mgs_startturn.wav';
// import Bust from '../assets/audio/mgs_warnbust.wav';
// import WinGame from '../assets/audio/mgs_winmatch.wav';
// import WinRound from '../assets/audio/mgs_winset.wav';

function Game( { gameState, opponentsUsername, endTurn, stand, newGame } ) {

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
        // Automatic standing
        const yourBoardSum = gameState["boards"]["you"]["board"].reduce((x, e) => x + e.value, 0);
        const opponentsBoardSum = gameState["boards"]["opponent"]["board"].reduce((x, e) => x + e.value, 0);

        if (yourBoardSum == 20 && !gameState["boards"]["you"]["standing"]) {
            stand();
        }

        // Game State Updating
        timedQueue.current.add(() => {
            setDisplayedGameState({
                ...gameState,
                "boards": {
                    "you": {
                        ...gameState["boards"]["you"],
                        "boardSum": yourBoardSum
                    },
                    "opponent": {
                        ...gameState["boards"]["opponent"],
                        "boardSum": opponentsBoardSum
                    }
                }
            });
        }, 0);
        timedQueue.current.add(() => { }, 500);
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

    return (
        <div className="Game">
            <GameOver finished={displayedGameState.finished} yourScore={displayedGameState["boards"]["you"]["points"]} 
                opponentScore={displayedGameState["boards"]["opponent"]["points"]} newGame={NewGame} />
            <WaitingForOpponent playerCount={displayedGameState.playerCount} finished={displayedGameState.finished} />
            <TurnOverlay gameState={displayedGameState} />
            <GameBoard gameState={displayedGameState} opponentsUsername={opponentsUsername} endTurn={EndTurn} stand={Stand} />
        </div>
    )
}

export default Game;