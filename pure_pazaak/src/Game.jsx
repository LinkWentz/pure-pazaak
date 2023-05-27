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
      socket.emit('join-session', params['sessionName']);

      socket.on('connection', () => {
        socket.emit('join-session', params['sessionName']);
      });
      
      socket.on('game-state', (newGameState) => {
        setGameState(newGameState);
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
      socket.emit('game-event', 'end turn', params['sessionName']);
    };
  
    const Stand = () => {
      socket.emit('game-event', 'stand', params['sessionName']);
    };

    const NewGame = () => {
      socket.emit("game-event", "new game", params['roomcode']);
    };

    return(
        <div className="Game">
          <GameOver finished={gameState.finished} yourScore={gameState["boards"]["you"]["points"]} 
          opponentScore={gameState["boards"]["opponent"]["points"]} newGame={NewGame}/>
          <WaitingForOpponent playerCount={gameState.playerCount} 
          finished={gameState.finished}/>
          <TurnOverlay turn={gameState.turn} youStanding={gameState["boards"]["you"]["standing"]} 
          opponentStanding={gameState["boards"]["opponent"]["standing"]}/>
          <GameBoard gameState={gameState} opponentsUsername={opponentsUsername}
          endTurn={EndTurn} stand={Stand}/>
        </div>
    )
}

export default Game;