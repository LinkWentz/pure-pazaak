import './WaitingForOpponent.css';
import { useEffect, useState } from 'react';

function WaitingForOpponent(props){

    const [style, setStyle] = useState({});

    useEffect(() => {
        if (props.playerCount > 1){
            setStyle({"visibility": "hidden"});
        }
        else {
            setStyle({"visibility": "visible"});
        }
    }, [props.playerCount]);

    return(
        <div className="WaitingForOpponent" style={style}>
            <p>Waiting for opponent...</p>
        </div>
    )
}

export default WaitingForOpponent;