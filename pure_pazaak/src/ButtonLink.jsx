import './Button.css'
import { Link } from 'react-router-dom';

function ButtonLink(props) {
  return (
    <Link className={`Button ButtonLink ${props.className}`} style={props.style || {}} to={props.to}>
      <span>{props.children}</span>
    </Link>
  )
}

export default ButtonLink