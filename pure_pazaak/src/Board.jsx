import './Board.css'
import Card from './Card'

function Board(props) {

  const card_elements = [];

  for (const card in props.cards){
    card_elements.push(<Card value={props.cards[card]}/>);
  }

  return (
    <div className="BoardContainer">
      <div className="Board">
        {card_elements}
      </div>
      <div className="sum"><p>{props.cards.reduce((x, e) => x + e, 0)}</p></div>
    </div>
  )
}

export default Board
