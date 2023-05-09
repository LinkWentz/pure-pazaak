import './Game.css';
import Scoreboard from './Scoreboard';
import Board from './Board' ;
import Sidedeck from './Sidedeck';
import OpponentsSidedeck from './OpponentsSidedeck'
import Button from './Button';
import ButtonLink from './ButtonLink';
import BoardSum from './BoardSum';
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
          "sidedeckSize": 4,
          "points": 0,
          "standing": false,
          "board": []
        }
      },
      "turn": "you",
      "finished": false
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
  
    const EndTurn = () => {
      socket.emit('game-event', 'end turn', params['roomcode']);
    };
  
    const Stand = () => {
      socket.emit('game-event', 'stand', params['roomcode']);
    };
  

    return(
        <div className="Game">
            <Scoreboard score={gameState["boards"]["you"]["points"]}/>
            <div className="Spacer"/>
            <BoardSum board={gameState["boards"]["you"]["board"]}/>
            <div className="Spacer"/>
            <BoardSum board={gameState["boards"]["opponent"]["board"]}/>
            <div className="Spacer"/>
            <Scoreboard score={gameState["boards"]["opponent"]["points"]}/>

            <div className="Spacer"/>
            <Board cards={gameState["boards"]["you"]["board"]}/>
            <div className="Spacer"/>
            <Board cards={gameState["boards"]["opponent"]["board"]}/>
            <div className="Spacer"/>

            <div className="Spacer"/>
            <Sidedeck cards={gameState["boards"]["you"]["sidedeck"]}></Sidedeck>
            <div className="Spacer"/>
            <OpponentsSidedeck cardsCount={gameState["boards"]["opponent"]["sidedeckSize"]}/>
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