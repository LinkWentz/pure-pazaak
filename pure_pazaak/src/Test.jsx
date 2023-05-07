import './Test.css';
import Scoreboard from './Scoreboard';
import Board from './Board' ;
import Sidedeck from './Sidedeck';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { socket } from './App';

function Test(){

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
        <div className="A">
            <Scoreboard score={state["boards"][role["you"]]["points"]}/>
            <div className="B"/>
            <div className="B"><p style={{fontSize: "1.7rem", textAlign: "center"}}>{state["boards"][role["you"]]["board"].reduce((x, e) => x + e, 0)}</p></div>
            <div className="B"/>
            <div className="B"><p style={{fontSize: "1.7rem", textAlign: "center"}}>{state["boards"][role["opponent"]]["board"].reduce((x, e) => x + e, 0)}</p></div>
            <div className="B"/>
            <Scoreboard score={state["boards"][role["opponent"]]["points"]}/>

            <div className="B"/>
            <Board cards={state["boards"][role["you"]]["board"]}/>
            <div className="B"/>
            <Board cards={state["boards"][role["opponent"]]["board"]}/>
            <div className="B"/>

            <Sidedeck cards={state["boards"][role["you"]]["side_deck"]}></Sidedeck>
            <div className="B"/>
            <div className="B E"/>

            <div className="Button" style={{width: "100%", height: "100%", fontSize: "1rem"}} onClick={EndTurn}>End Turn</div>
            <div className="Button" style={{width: "100%", height: "100%", fontSize: "1rem"}} onClick={Stand}>Stand</div>
            <div className="B"/>
            <div className="B"/>
            <Link className="Button" style={{width: "100%", height: "100%", fontSize: "1rem"}} to="/">Main Menu</Link>
            <div className="B E" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p style={{fontSize: "1rem"}}>{(() => {
                    if (role["you"] == state["turn"]) {
                        return "Your Turn";
                    }
                    else {
                        return "Opponent's Turn";
                    }
                    })()}
                </p>
            </div>
        </div>
    )
}

export default Test;