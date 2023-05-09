import './Game.css';
import WaitingForOpponent from './WaitingForOpponent';
import TurnOverlay from './TurnOverlay';
import GameBoard from './GameBoard';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { socket } from './App';

function Game(){

    const params = useParams();
  
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
      })
      socket.on('game-state', (newGameState) => {
        setGameState(newGameState);
      });
      return () => {
        socket.emit('leave-room', params['roomcode']);
      };
    }, []);

    return(
        <div className="Game">
          <WaitingForOpponent playerCount={gameState.playerCount}/>
          <TurnOverlay turn={gameState.turn}/>
          <GameBoard gameState={gameState}/>
        </div>
    )
}

export default Game;