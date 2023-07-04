// Stylesheets
import './styles/TurnOverlay.css';
// Components
import Overlay from './Overlay';

function TurnOverlay(props){
    return(
        <div className="TurnOverlay">
            <Overlay className="yourTurnOverlay" visible={props.gameState.turn != 'you' && !props.gameState["boards"]["you"]["standing"]}/>
            <Overlay className="opponentsTurnOverlay" visible={props.gameState.turn != 'opponent' && !props.gameState["boards"]["opponent"]["standing"]}/>
            <Overlay className="yourTurnOverlay" visible={props.gameState["boards"]["you"]["standing"]}>Standing</Overlay>
            <Overlay className="opponentsTurnOverlay" visible={props.gameState["boards"]["opponent"]["standing"]}>Standing</Overlay>
            <Overlay className="yourCardPlayedOverlay" visible={props.gameState["boards"]["you"]["sidedeckCardPlayed"]}/>
            <Overlay className="opponentsCardPlayedOverlay" visible={props.gameState["boards"]["opponent"]["sidedeckCardPlayed"]}/>
        </div>
    )
}

export default TurnOverlay;