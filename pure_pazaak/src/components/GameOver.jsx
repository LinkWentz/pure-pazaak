// Stylesheets
import './styles/GameOver.css';
// Components
import Button from './Button';
// Libraries
import { useEffect, useState } from 'react';

function GameOver( { finished=false, yourScore=0, opponentScore=0, newGame=()=>{}} ){

    const [style, setStyle] = useState({"visiblity": "hidden"});

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (finished){
            setStyle({"visibility": "visible"});
        }
        else {
            setStyle({"visibility": "hidden"});
        }

        if (yourScore > opponentScore){
            setMessage("You won!");
        }
        else {
            setMessage("You lost!");
        }
    }, [finished]);

    return(
        <div className="GameOver" style={style}>
            <p className="message">{message}</p>
            <Button to={'/'} className="mainMenu">Main Menu</Button>
            <Button onClick={newGame}>Rematch</Button>
        </div>
    )
}

export default GameOver;