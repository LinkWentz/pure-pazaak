import './Board.css';
import Card from './Card';
import Scoreboard from './Scoreboard';

function Board(props) {

  const card_elements = [];

  for (const card in props.cards){
    card_elements.push(<Card value={props.cards[card]}/>);
  }

  return (
    <div className="Board">
      <div className="cardGrid">
        {card_elements}
      </div>
    </div>
  )
}

export default Board
