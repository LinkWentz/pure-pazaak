import './TurnOverlay.css';
import Spacer from './Spacer';
import Overlay from './Overlay';

function TurnOverlay(props){
    return(
        <div className="TurnOverlay">
            <Spacer/>
            <Spacer/>
            <Overlay for="you" turn={props.turn}/>
            <Overlay for="opponent" turn={props.turn}/>
        </div>
    )
}

export default TurnOverlay;