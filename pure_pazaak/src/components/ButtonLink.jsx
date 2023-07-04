// Stylesheets
import './styles/Button.css'
// Libraries
import { Link } from 'react-router-dom';
// Audio
import Scroll from '../assets/audio/gui_actscroll.wav';
import Click from '../assets/audio/gui_actuse.wav';

function ButtonLink(props) {

  const onMouseEnter = () => {
    new Audio(Scroll).play();
  }

  const onMouseDown = () => {
    new Audio(Click).play();
  }

  return (
    <Link className={`Button ButtonLink ${props.className}`} style={props.style || {}} to={props.to} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}>
      <span>{props.children}</span>
    </Link>
  )
}

export default ButtonLink