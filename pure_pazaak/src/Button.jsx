import './Button.css'
import Scroll from './assets/audio/gui_actscroll.wav';
import Click from './assets/audio/gui_actuse.wav';

function Button(props) {

  const onMouseEnter = () => {
    new Audio(Scroll).play();
  }

  const onMouseDown = () => {
    new Audio(Click).play();
  }


  return (
    <div className={`Button ${props.className}`} style={props.style || {}} onClick={props.onClick} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}>
      <span>{props.children}</span>
    </div>
  )
}

export default Button