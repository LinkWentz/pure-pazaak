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
        for (const card in props.cards) {
            newCards.push(
                <Card key={card} card={props.cards[card]} 
                onClick={() => props.playCard(props.cards[card])} 
                acceptPointerEvents={true} />
            );
        }
        setCards(newCards);
    }, [props.cards]);

    return (
        <div className={`Sidedeck ${props.className}`}>
            <div className="sidedeckGrid">
                {cards}
            </div>
        </div>
    )
}

export default Sidedeck