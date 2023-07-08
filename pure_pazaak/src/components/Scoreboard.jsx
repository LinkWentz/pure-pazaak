// Stylesheets
import "./styles/Scoreboard.css";
// Components
import Point from './Point';
// Libraries
import { useState, useEffect } from 'react';
// Audio
import WinRound from '../assets/audio/mgs_winset.wav';
import LoseRound from '../assets/audio/mgs_loseset.wav';
import WinGame from '../assets/audio/mgs_winmatch.wav';
import LoseGame from '../assets/audio/mgs_losematch.wav';

function Scoreboard(props) {

    const [score, setScore] = useState(props.score);
    const [points, setPoints] = useState(Array.from({length: props.maxScore || 3}));

    useEffect(() => {
        if (props.score == score + 1) {
            if (props.score == props.maxScore || props.score == 3) {
                if (props.role == "you") {
                    new Audio(WinGame).play();
                }
                else if (props.role == "opponent") {
                    new Audio(LoseGame).play();
                }   
            } else {
                if (props.role == "you") {
                    new Audio(WinRound).play();
                }
                else if (props.role == "opponent") {
                    new Audio(LoseRound).play();
                }
            }
        }
        setScore(props.score);
    }, [props.score]);

    useEffect(() => {
        const newPoints = [];
        for (const i in points){
            if (i < score) {
                newPoints.push(<Point key={"point_" + i} color="var(--scoredPointColor)"/>);
            }
            else {
                newPoints.push(<Point key={"point_" + i} color="var(--unscoredPointColor)"/>);
            }
        }
        setPoints(newPoints);
    }, [score]);

    return (
        <div className={`Scoreboard ${props.className}`}>
            {points}
        </div>
    )
}

export default Scoreboard;