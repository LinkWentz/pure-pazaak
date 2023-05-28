import './Button.css'

function Button(props) {
  return (
    <div className={`Button ${props.className}`} onClick={props.onClick}>{props.children}</div>
  )
}

export default Button