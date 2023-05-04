import './Card.css'

function Card(props) {
  return (
    <div className="Card" style={props.style} onClick={() => props.onClick(props.value)}>
      <p style={{pointerEvents: "none"}}>{props.value}</p>
    </div>
  )
}

export default Card
