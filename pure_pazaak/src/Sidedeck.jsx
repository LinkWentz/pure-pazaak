import './Sidedeck.css'
import Card from './Card'
import { useParams } from "react-router-dom";
import { socket } from './App';

function Sidedeck(props) {

  const params = useParams();
  const card_elements = [];

  const PlayCard = (value) => {
    socket.emit('game-event', value, params['roomcode']);
  };

  for (const card in props.cards){
    let color = '#AA0000';
    if (props.cards[card] > 0) {
      color = '#0000AA';
    }
    card_elements.push(
    <Card key={card} value={props.cards[card]} 
    onClick={PlayCard}
    style={{backgroundColor: color, cursor: "pointer"}}/>);
  }

  return (
    <div className="Sidedeck">
      {card_elements}
    </div>
  )
}

export default Sidedeck