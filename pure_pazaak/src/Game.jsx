import './Game.css';
import Scoreboard from './Scoreboard';
import Board from './Board' ;
import Sidedeck from './Sidedeck';
import Button from './Button';
import ButtonLink from './ButtonLink';
import BoardSum from './BoardSum';
import TurnIndicator from './TurnIndicator';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { socket } from './App';

function Game(){

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
  

    return(
        <div className="Game">
            <Scoreboard score={state["boards"][role["you"]]["points"]}/>
            <div className="Spacer"/>
            <BoardSum board={state["boards"][role["you"]]["board"]}/>
            <div className="Spacer"/>
            <BoardSum board={state["boards"][role["opponent"]]["board"]}/>
            <div className="Spacer"/>
            <Scoreboard score={state["boards"][role["opponent"]]["points"]}/>

            <div className="Spacer"/>
            <Board cards={state["boards"][role["you"]]["board"]}/>
            <div className="Spacer"/>
            <Board cards={state["boards"][role["opponent"]]["board"]}/>
            <div className="Spacer"/>

            <div className="Spacer"/>
            <Sidedeck cards={state["boards"][role["you"]]["sidedeck"]}></Sidedeck>
            <div className="Spacer"/>
            <div className="Spacer"/>
            <div className="Spacer"/>
            <div className="Spacer"/>
            <div className="Spacer"/>

            <ButtonLink to="/">Main Menu</ButtonLink>
            <div className="Spacer"/>
            <div className="Spacer"/>
            <div className="Spacer"/>
            <div className="Spacer"/>
            <Button onClick={EndTurn}>End Turn</Button>
            <Button onClick={Stand}>Stand</Button>
        </div>
    )
}

export default Game;