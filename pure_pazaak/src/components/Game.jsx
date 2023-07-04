import { socket } from '../App';
// Stylesheets
import './styles/Game.css';
// Components
import GameOver from './GameOver';
import WaitingForOpponent from './WaitingForOpponent';
import TurnOverlay from './TurnOverlay';
import GameBoard from './GameBoard';
// Libraries
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
// Audio
import DrawCard from '../assets/audio/mgs_drawmain.wav';
import LoseGame from '../assets/audio/mgs_losematch.wav';
import LoseRound from '../assets/audio/mgs_loseset.wav';
import PlayCard from '../assets/audio/mgs_playside.wav';
import StartTurn from '../assets/audio/mgs_startturn.wav';
import Bust from '../assets/audio/mgs_warnbust.wav';
import WinGame from '../assets/audio/mgs_winmatch.wav';
import WinRound from '../assets/audio/mgs_winset.wav';

function Game(){

    const timedQueue = (function(){
      var API;                // internal referance to interface
      const queue = [];       // array to hold functions
      var task = null;        // the next task to run
      var tHandle;            // To stop pending timeout 
      function next(){  // runs current scheduled task and  creates timeout to schedule next
          if(task !== null){          // is task scheduled??
              task.func();            // run it
              task = null;            // clear task
          }
          if(queue.length > 0){       // are there any remain tasks??
              task = queue.shift();   // yes set as next task
              tHandle = setTimeout(next,task.time) // schedual when
          }else{
              API.done = true;
              setQueueDone(true);
          }
      }
      return API = {
          add : function(func,time){
              queue.push({func : func, time: time});
          },
          start : function(){
              if(queue.length > 0 && API.done){
                  API.done = false;   // set state flag
                  setQueueDone(false);
                  tHandle = setTimeout(next,0);
              }
          },
          clear : function(){
              task = null;            // remove pending task
              queue.length = 0;       // empty queue
              clearTimeout(tHandle);  // clear timeout
              API.done = true;        // set state flag
              setQueueDone(true);
          },
          done : true,
      }
    })();

    const params = useParams();
  
    const [opponentsUsername, setOpponentsUsername] = useState(null);

    const [queueDone, setQueueDone] = useState(true);

    const [gameState, setGameState] = useState({
      "boards": {
        "you": {
          "points": 0,
          "standing": false,
          "sidedeck": [],
          "sidedeckCardPlayed": false,
          "board": []
        },
        "opponent": {
          "sidedeckSize": 0,
          "points": 0,
          "standing": false,
          "sidedeckCardPlayed": false,
          "board": []
        }
      },
      "turn": "you",
      "finished": false,
      "playerCount": 1,
      "role": "Player 1"
    });

    useEffect(() => {
      socket.emit('join-session', params['sessionName']);

      socket.on('connection', () => {
        socket.emit('join-session', params['sessionName']);
      });
      
      socket.on('game-state', (newGameState, label) => {
        if (!label) {
          label = "";
        }

        // If card is dealt
        if (label.includes("dealt")) {
          timedQueue.add(() => new Audio(DrawCard).play(), 0);
        }
        // If card is played
        if (label.includes("played")) {
          timedQueue.add(() => new Audio(PlayCard).play(), 0);
        }
        // If player wins round
        if (label.includes("win") && label.includes("round") && label.includes(gameState["role"]) && !label.includes("No one")){
          timedQueue.add(() => new Audio(WinRound).play(), 0);
        }
        // If player lsoes round
        if (label.includes("win") && label.includes("round") && !label.includes(gameState["role"]) && !label.includes("No one")){
          timedQueue.add(() => new Audio(LoseRound).play(), 0);
        }
        // if player wins game
        if (label.includes("win") && label.includes("game") && label.includes(gameState["role"]) && !label.includes("No one")){
          timedQueue.add(() => new Audio(WinGame).play(), 0);
        }
        // if player loses game
        if (label.includes("win") && label.includes("game") && !label.includes(gameState["role"]) && !label.includes("No one")){
          timedQueue.add(() => new Audio(LoseGame).play(), 0);
        }

        timedQueue.add(() => {setGameState(newGameState)}, 0);
        timedQueue.add(() => {}, 500);
        timedQueue.start();
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

    const EndTurn = () => {
      if (queueDone){
        socket.emit('game-event', 'end turn', params['sessionName']);
      }
    };
  
    const Stand = () => {
      if (queueDone){
        socket.emit('game-event', 'stand', params['sessionName']);
      }
    };

    const NewGame = () => {
      if (queueDone){
        socket.emit("game-event", "new game", params['roomcode']);
      }
    };

    return(
        <div className="Game">
          <GameOver finished={gameState.finished} yourScore={gameState["boards"]["you"]["points"]} 
          opponentScore={gameState["boards"]["opponent"]["points"]} newGame={NewGame}/>
          <WaitingForOpponent playerCount={gameState.playerCount} 
          finished={gameState.finished}/>
          <TurnOverlay gameState={gameState}/>
          <GameBoard gameState={gameState} opponentsUsername={opponentsUsername}
          endTurn={EndTurn} stand={Stand}/>
        </div>
    )
}

export default Game;