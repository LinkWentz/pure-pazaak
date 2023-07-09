// Stylesheets
import './styles/Tutorial.css';
// Components
import Game from './Game';
import TutorialMessageBubble from './TutorialMessageBubble';
// Libraries
import { useState, useEffect } from 'react';

function Tutorial() {

    const tutorialStates = [
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": false,
                    "sidedeck": [1, 1, 1, 1],
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
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "This is a tutorial message bubble!"
            },
            "highlightClass": "highlight1stCard",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": false,
                    "sidedeck": [1, 1, 1, 1],
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
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "This is also a tutorial message bubble!"
            },
            "highlightClass": "highlightEndTurn",
            "next": () => {}
        }
    ]

    const [currentState, setCurrentState] = useState(0);
    const [highlight, setHighlight] = useState("");

    const NextState = () => {
        if (currentState == tutorialStates.length - 1) {
            return;
        }
        setCurrentState(currentState + 1);
    };

    useEffect(() => {
        tutorialStates[currentState]["next"]();
        setHighlight(tutorialStates[currentState]["highlightClass"]);
    }, [currentState]);

    return (
        <div className={`Tutorial ${highlight}`}>
            <Game gameState={tutorialStates[currentState]}
            opponentsUsername={"Whoever the guy is who gives the tutorial (temp)"} 
            endTurn={NextState} stand={NextState} 
            newGame={NextState} playCard={NextState}/>
            <TutorialMessageBubble>{tutorialStates[currentState]["bubble"]["message"]}</TutorialMessageBubble>
        </div>
    )
}

export default Tutorial