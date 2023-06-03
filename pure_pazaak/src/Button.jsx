import './Button.css'

function Button(props) {
  return (
    <div className={`Button ${props.className}`} style={props.style || {}} onClick={props.onClick}>
      <span>{props.children}</span>
    </div>
  )
}

export default Button