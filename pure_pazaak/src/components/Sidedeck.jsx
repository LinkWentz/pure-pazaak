// Stylesheets
import './styles/Sidedeck.css';
// Components
import Card from './Card';
// Libraries
import { useEffect, useState } from 'react';

function Sidedeck(props) {

    const cards = []

    for (const card in props.cards) {
        cards.push(
            <Card key={card} card={props.cards[card]} 
            onClick={() => props.playCard(props.cards[card])} 
            acceptPointerEvents={true} />
        )
    }

    return (
        <div className={`Sidedeck ${props.className}`}>
            <div className="sidedeckGrid">
                {cards}
            </div>
        </div>
    )
}

export default Sidedeck