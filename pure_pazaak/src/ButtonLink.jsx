import './Button.css'
import { Link } from 'react-router-dom';

function ButtonLink(props) {
  return (
    <Link className={`Button ButtonLink ${props.className}`} to={props.to}>{props.children}</Link>
  )
}

export default ButtonLink