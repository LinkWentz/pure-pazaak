// Stylesheets
import './styles/Tutorial.css';
// Components
import Game from './Game';
// Libraries
import { useState, useEffect } from 'react';

function Tutorial() {

    const tutorialStates = [
        {
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
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": false,
                    "sidedeck": [],
                    "sidedeckCardPlayed": false,
                    "board": [{value: 10, type: "maindeck"}],
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
            "playerCount": 2,
            "role": "Player 1",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": false,
                    "sidedeck": [],
                    "sidedeckCardPlayed": false,
                    "board": [{value: 10, type: "maindeck"}],
                    "boardSum": 0
                },
                "opponent": {
                    "sidedeckSize": 0,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [{value: 10, type: "maindeck"}],
                    "boardSum": 0
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "next": () => {}
        }
    ]

    const [currentState, setCurrentState] = useState(0);

    const NextState = () => {
        if (currentState == tutorialStates.length - 1) {
            return;
        }
        setCurrentState(currentState + 1);
    };

    useEffect(() => {
        tutorialStates[currentState]["next"]();
    }, [currentState]);

    return (
        <>
            <Game gameState={tutorialStates[currentState]}
            opponentsUsername={"Whoever the guy is who gives the tutorial (temp)"} 
            endTurn={NextState} stand={NextState} 
            newGame={NextState} playCard={NextState}/>
        </>
    )
}

export default Tutorial