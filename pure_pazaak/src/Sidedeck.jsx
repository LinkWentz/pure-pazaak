import './Sidedeck.css';
import Card from './Card';
import { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { socket } from './App';

function Sidedeck(props) {

  const params = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const newCards = [];
    for (const card in props.cards){
      newCards.push(
        <Card key={card} card={props.cards[card]} onClick={PlayCard}/>
      );
    }
    setCards(newCards);
  }, [props.cards]);

  const PlayCard = (card) => {
    socket.emit('game-event', card, params['roomcode']);
  };

  return (
    <div className="Sidedeck">
      <div className="sidedeckGrid">
        {cards}
      </div>
    </div>
  )
}

export default Sidedeck