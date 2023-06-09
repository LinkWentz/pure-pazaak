// Stylesheets
import './styles/Sidedeck.css';
// Components
import Card from './Card';
// Libraries
import { useEffect, useState } from 'react';

function Sidedeck(props) {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        const newCards = [];
        for (let i = 0; i < props.cardsCount; i++) {
            newCards.push(<Card key={i} />);
        }
        setCards(newCards);
    }, [props.cardsCount]);

    return (
        <div className={`OpponentsSidedeck Sidedeck ${props.className}`} style={{ pointerEvents: 'none' }}>
            <div className="sidedeckGrid">
                {cards}
            </div>
        </div>
    )
}

export default Sidedeck