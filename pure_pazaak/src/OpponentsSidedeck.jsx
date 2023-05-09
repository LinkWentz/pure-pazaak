import './Sidedeck.css';
import CardBack from './CardBack';

function Sidedeck(props) {

  const card_elements = Array.from({length: props.cardsCount}, () => <CardBack/>);

  return (
    <div className="OpponentsSidedeck Sidedeck">
      <div className="sidedeckGrid">
        {card_elements}
      </div>
    </div>
  )
}

export default Sidedeck