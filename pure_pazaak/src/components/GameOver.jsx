// Stylesheets
import './styles/GameOver.css';
// Components
import Button from './Button';
// Libraries
import { useEffect, useState } from 'react';

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
            <Button to={'/'} className="mainMenu">Main Menu</Button>
            <Button onClick={props.newGame}>Rematch</Button>
        </div>
    )
}

export default GameOver;