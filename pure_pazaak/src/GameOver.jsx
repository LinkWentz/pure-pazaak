import './GameOver.css';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { socket } from './App';

function GameOver(props){

    const params = useParams();

    const [style, setStyle] = useState({});

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (props.finished){
            setStyle({"visibility": "visible"});
        }
        else {
            setStyle({"visibility": "hidden"});
        }

        if (props.yourScore > props.opponentScore){
            setMessage("You won!");
        }
        else if (props.yourScore == props.opponentScore) {
            setMessage("Tie!");
        }
        else {
            setMessage("You lost!");
        }
    }, [props.finished]);

    const RestartGame = () => {
        socket.emit("game-event", "new game", params['roomcode']);
    }

    return(
        <div className="GameOver" style={style}>
            <div className="message">{message}</div>
            <div className="buttons">
                <Button onClick={RestartGame}>Rematch</Button>
                <ButtonLink to="/">Main Menu</ButtonLink>
            </div>
        </div>
    )
}

export default GameOver;