import { socket } from '../App';
// Stylesheets
import './styles/BoardSum.css'
// Libraries
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// Audio
import BustSound from '../assets/audio/mgs_warnbust.wav';

function BoardSum(props) {

    const params = useParams();

    const [sum, setSum] = useState(0);

    useEffect(() => {
        setSum(props.board.reduce((x, e) => x + e.value, 0))
    }, [props])

    useEffect(() => {
        if (sum == 20 && props.stand) {
            socket.emit('game-event', 'stand', params['sessionName']);
        }

        if (sum > 20) {
            new Audio(BustSound).play();
        }
    }, [sum, setSum])

    return(
        <div className={`BoardSum ${props.className}`}>
            <p>{sum}</p>
        </div>
    )
}

export default BoardSum;