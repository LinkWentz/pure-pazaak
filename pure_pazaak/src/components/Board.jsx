// Stylesheets
import './styles/Board.css';
// Components
import Card from './Card';
// Libraries
import { useState, useEffect } from 'react';
//Audio
import DrawCard from '../assets/audio/mgs_drawmain.wav';
import PlayCard from '../assets/audio/mgs_playside.wav';

function Board(props) {

    const [cardElements, setCardElements] = useState([]);

    useEffect(() => {
        const newCardElements = [];
        for (const card in props.cards) {
            newCardElements.push(<Card key={card} card={props.cards[card]} />);
        }

        if (newCardElements.length == cardElements.length+1) {
            const cardType = props.cards[props.cards.length - 1]["type"];
            if (cardType == 'sidedeck') {
                new Audio(PlayCard).play();
            }
            else {
                new Audio(DrawCard).play();
            }
        }

        setCardElements(newCardElements);
    }, [props.cards]);

    return (
        <div className={`Board ${props.className}`}>
            <div className="cardGrid">
                {cardElements}
            </div>
        </div>
    )
}

export default Board
