import { socket } from '../App';
// Stylesheets
import './styles/Sidedeck.css';
// Components
import Card from './Card';
// Libraries
import { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

function Sidedeck(props) {

  const params = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const newCards = [];
    for (const card in props.cards){
      newCards.push(
        <Card key={card} card={props.cards[card]} onClick={PlayCard} acceptPointerEvents={true}/>
      );
    }
    setCards(newCards);
  }, [props.cards]);

  const PlayCard = (card) => {
    socket.emit('game-event', card, params['roomcode']);
  };

  return (
    <div className={`Sidedeck ${props.className}`}>
      <div className="sidedeckGrid">
        {cards}
      </div>
    </div>
  )
}

export default Sidedeck