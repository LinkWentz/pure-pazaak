import './Sidedeck.css';
import Card from './Card';
import { useParams } from "react-router-dom";
import { socket } from './App';

function Sidedeck(props) {

  const params = useParams();
  const card_elements = [];

  const PlayCard = (card) => {
    socket.emit('game-event', card, params['roomcode']);
  };

  for (const card in props.cards){
    card_elements.push(
      <Card key={card} card={props.cards[card]} 
      onClick={PlayCard}/>
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