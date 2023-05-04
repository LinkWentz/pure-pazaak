import './Game.css';
import Board from './Board' ;
import Sidedeck from './Sidedeck';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { socket } from './App';

function Game() {

  const params = useParams();

  const [role, setRole] = useState({
    "you": "Player 1",
    "opponent": "Player 2"
  })

  const [state, setState] = useState({
    "players": {
      "Player 1": null,
      "Player 2": null
    },
    "boards": {
      "Player 1": {
        "points": 0,
        "board": []
      },
      "Player 2": {
        "points": 0,
        "board": []
      }
    },
    "turn": "Player 1",
    "finished": false
  });

  useEffect(() => {
    socket.emit('join-room', params['roomcode']);
    socket.on('connection', () => {
      socket.emit('join-room', params['roomcode']);
    })
    socket.on('game-state', (gameState) => {
      setState(gameState);
    });
    return () => {
      socket.emit('leave-room', params['roomcode']);
    };
  }, []);

  useEffect(() => {
    if (socket.id == state.players["Player 1"]){
      setRole({
        "you": "Player 1",
        "opponent": "Player 2"
      });
    }
    else if (socket.id == state.players["Player 2"]){
      setRole({
        "you": "Player 2",
        "opponent": "Player 1"
      });
    }
  }, [state]);

  const EndTurn = (event) => {
    socket.emit('game-event', 'end turn', params['roomcode']);
  };

  const Stand = (event) => {
    socket.emit('game-event', 'stand', params['roomcode']);
  };

  return (
    <div className="Game">
      <div className="Boards">
        <Board cards={state["boards"][role["you"]]["board"]}></Board>
        <Board cards={state["boards"][role["opponent"]]["board"]}></Board>
      </div>
      <div className="Controls">
        <div className="Button" onClick={EndTurn}>End Turn</div>
        <div className="Button" onClick={Stand}>Stand</div>
        <Sidedeck cards={state["boards"][role["you"]]["side_deck"]}></Sidedeck>
        <div className="Score">
          <p>You: {state["boards"][role["you"]]["points"]}</p>
          <p>Opponent: {state["boards"][role["opponent"]]["points"]}</p>
        </div>
        <p>{(() => {
          if (role["you"] == state["turn"]) {
            return "Your Turn";
          }
          else {
            return "Opponent's Turn";
          }
        })()}</p>
        <Link className="Button" to="/">Main Menu</Link>
      </div>
    </div>
  )
}

export default Game