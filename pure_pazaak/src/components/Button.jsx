// Stylesheets
import './styles/Button.css'
// Libraries
import { Link } from 'react-router-dom';
// Audio
import Scroll from '../assets/audio/gui_actscroll.wav';
import Click from '../assets/audio/gui_actuse.wav';

function Button(props) {

  const onMouseEnter = () => {
    new Audio(Scroll).play();
  }

  const onMouseDown = () => {
    new Audio(Click).play();
  }

  if (props.to) {
    return (
      <Link to={props.to} 
      className={`Button ${props.className}`} 
      style={props.style || {}} 
      onMouseDown={onMouseDown} 
      onMouseEnter={onMouseEnter}>
        <span>{props.children}</span>
      </Link>
    )
  }
  else if (props.onClick){
    return (
      <div onClick={props.onClick}
      className={`Button ${props.className}`} 
      style={props.style || {}} 
      onMouseDown={onMouseDown} 
      onMouseEnter={onMouseEnter}>
        <span>{props.children}</span>
      </div>
    )
  }
}

export default Button