// Stylesheets
import './styles/Board.css';
// Components
import Card from './Card';

function Board(props) {

  const card_elements = [];

  for (const card in props.cards){
    card_elements.push(<Card key={card} card={props.cards[card]}/>);
  }

  return (
    <div className={`Board ${props.className}`}>
      <div className="cardGrid">
        {card_elements}
      </div>
    </div>
  )
}

export default Board
