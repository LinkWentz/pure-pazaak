// Stylesheets
import './styles/WaitingForOpponent.css';
// Components
import Button from './Button';
// Libraries
import { useEffect, useState } from 'react';

function WaitingForOpponent(props){

    const [style, setStyle] = useState({});

    useEffect(() => {
        if (props.playerCount > 1 || props.finished){
            setStyle({"visibility": "hidden"});
        }
        else {
            setStyle({"visibility": "visible"});
        }
    }, [props.playerCount, props.finished]);

    const CopyInviteToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
    };
    
    return(
        <div className="WaitingForOpponent" style={style}>
            <p>Waiting for opponent...</p>
            <Button to="/" className="mainMenu">Main Menu</Button>
            <Button onClick={CopyInviteToClipboard}>Copy Invite</Button>
        </div>
    )
}

export default WaitingForOpponent;