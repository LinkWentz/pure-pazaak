// Stylesheets
import './styles/TurnOverlay.css';
// Components
import Overlay from './Overlay';

function TurnOverlay({ gameState, inputDisabled }){

    const you = {
        turn: gameState["turn"] == 'you',
        standing: gameState["boards"]["you"]["standing"],
        cardPlayed: gameState["boards"]["you"]["sidedeckCardPlayed"]
    }

    const opponent = {
        turn: gameState["turn"] == 'opponent',
        standing: gameState["boards"]["opponent"]["standing"],
        cardPlayed: gameState["boards"]["opponent"]["sidedeckCardPlayed"]
    }

    return(
        <div className="TurnOverlay">
            <Overlay className="yourTurnOverlay" visible={!you.turn && !you.standing}/>
            <Overlay className="opponentsTurnOverlay" visible={!opponent.turn && !opponent.standing}/>
            <Overlay className="yourTurnOverlay" visible={you.standing}>Standing</Overlay>
            <Overlay className="opponentsTurnOverlay" visible={opponent.standing}>Standing</Overlay>
            <Overlay className="yourCardPlayedOverlay" visible={you.cardPlayed || !you.turn || you.standing || inputDisabled}/>
            <Overlay className="opponentsCardPlayedOverlay" visible={opponent.cardPlayed || !opponent.turn || opponent.standing}/>
        </div>
    )
}

export default TurnOverlay;