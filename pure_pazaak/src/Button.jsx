import './Button.css'

function Button(props) {
  return (
    <div className="Button">{props.children}</div>
  )
}

export default Button