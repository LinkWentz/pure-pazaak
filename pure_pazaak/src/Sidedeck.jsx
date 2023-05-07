import './Sidedeck.css';
import Card from './Card';
import { useParams } from "react-router-dom";
import { socket } from './App';

function Sidedeck(props) {

  const params = useParams();
  const card_elements = [];

  const PlayCard = (value) => {
    socket.emit('game-event', value, params['roomcode']);
  };

  for (const card in props.cards){
    let color = 'var(--negativeCardColor)';
    if (props.cards[card] > 0) {
      color = 'var(--positiveCardColor)';
    }
    card_elements.push(
      <Card key={card} value={props.cards[card]} 
      onClick={PlayCard} color={color}/>
    );
  }

  return (
    <div className="Sidedeck">
      <div className="sidedeckGrid">
        {card_elements}
      </div>
    </div>
  )
}

export default Sidedeck