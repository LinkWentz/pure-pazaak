import './GameOver.css';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function GameOver(props){

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

    return(
        <div className="GameOver" style={style}>
            <p className="message">{message}</p>
            <ButtonLink to={'/'} className="mainMenu">Main Menu</ButtonLink>
            <Button onClick={props.newGame}>Rematch</Button>
        </div>
    )
}

export default GameOver;