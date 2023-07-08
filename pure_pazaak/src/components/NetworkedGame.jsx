import { socket } from '../App';

import Game from './Game';

import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

function NetworkedGame() {
    
    const params = useParams();

    const [opponentsUsername, setOpponentsUsername] = useState(null);
    const [gameState, setGameState] = useState({
        "boards": {
            "you": {
                "points": 0,
                "standing": false,
                "sidedeck": [],
                "sidedeckCardPlayed": false,
                "board": [],
                "boardSum": 0
            },
            "opponent": {
                "sidedeckSize": 0,
                "points": 0,
                "standing": false,
                "sidedeckCardPlayed": false,
                "board": [],
                "boardSum": 0
            }
        },
        "turn": "you",
        "finished": false,
        "playerCount": 1,
        "role": "Player 1"
    });
    
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
        socket.emit('join-session', params['sessionName']);

        socket.on('connection', () => {
            socket.emit('join-session', params['sessionName']);
        });

        socket.on('game-state', (newGameState, label) => {
            timedQueue.current.add(() => {
                setGameState(newGameState);
            }, 100);
            timedQueue.current.start();
        });

        socket.on('username-request', () => {
            socket.volatile.emit('username', window.localStorage.username || null);
        });

        socket.on('opponents-username', (opponentsUsername) => {
            setOpponentsUsername(opponentsUsername);
        });

        return () => {
            socket.emit('leave-session', params['sessionName']);

            socket.off('connection');
            socket.off('game-state');
            socket.off('username-request');
            socket.off('opponents-username');
        };
    }, []);

    const EndTurn = () => socket.emit('game-event', 'end turn', params['sessionName']);

    const Stand = () => socket.emit('game-event', 'stand', params['sessionName']);;

    const NewGame = () => socket.emit("game-event", "new game", params['roomcode']);

    return (
        <Game gameState={gameState}
        opponentsUsername={opponentsUsername} 
        endTurn={EndTurn} stand={Stand} 
        newGame={NewGame}/>
    )
}

export default NetworkedGame;