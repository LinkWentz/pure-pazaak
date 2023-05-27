import './TurnOverlay.css';
import Spacer from './Spacer';
import Overlay from './Overlay';

function TurnOverlay(props){
    return(
        <div className="TurnOverlay">
            <Spacer/>
            <Spacer/>
            <Overlay for="you" turn={props.turn} standing={props.youStanding}></Overlay>
            <Overlay for="opponent" turn={props.turn} standing={props.opponentStanding}></Overlay>
        </div>
    )
}

export default TurnOverlay;