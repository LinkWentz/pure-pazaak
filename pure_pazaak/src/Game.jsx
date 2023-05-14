import './Game.css';
import GameOver from './GameOver';
import WaitingForOpponent from './WaitingForOpponent';
import TurnOverlay from './TurnOverlay';
import GameBoard from './GameBoard';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { socket } from './App';

function Game(){

    const params = useParams();
  
    const [opponentsUsername, setOpponentsUsername] = useState(null);

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
          "board": []
        }
      },
      "turn": "you",
      "finished": false,
      "playerCount": 1
    });
  
    useEffect(() => {
      socket.emit('join-room', params['roomcode']);
      socket.on('connection', () => {
        socket.emit('join-room', params['roomcode']);
      });
      
      socket.on('game-state', (newGameState) => {
        setGameState(newGameState);
      });

      socket.on('username-request', () => {
        socket.volatile.emit('username', window.localStorage.username || null);
      });

      socket.on('opponents-username', (opponentsUsername) => {
        setOpponentsUsername(opponentsUsername);
      })

      return () => {
        socket.emit('leave-room', params['roomcode']);
      };
    }, []);

    return(
        <div className="Game">
          <GameOver finished={gameState.finished} yourScore={gameState["boards"]["you"]["points"]} 
          opponentScore={gameState["boards"]["opponent"]["points"]}/>
          <WaitingForOpponent playerCount={gameState.playerCount} 
          finished={gameState.finished}/>
          <TurnOverlay turn={gameState.turn}/>
          <GameBoard gameState={gameState} opponentsUsername={opponentsUsername}/>
        </div>
    )
}

export default Game;