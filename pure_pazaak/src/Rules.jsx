import './Rules.css'
import { Link } from "react-router-dom"

function Rules() {
  return (
    <div className="Rules">
      <header>Rules</header>
      <main>
        <p>
          PAZAAK is essentially competitive blackjack. TWO PLAYERS take turns being dealt
          a card, and playing cards from their hand to ensure that the SUM TOTAL of the
          cards played on their side that round is as high as possible without going OVER
          20. The first player to have the highest score in 3 separate rounds wins the
          game.
        </p>
        <p>
          At the start of your turn you recieve a card valued from 1-10. You then have
          the opportunity to play a card from your SIDE DECK, which is a hand of four cards
          you receive for the entirety of the game. These cards can either ADD or SUBTRACT
          from your total score, in amounts of 1-6. Your SIDE DECK DOES NOT REPLENISH, so
          manage it wisely.
        </p>
        <p>
          At the end of your turn you can either STAND, locking in your score for the
          remainder of the round, or you can END YOUR TURN, which means you will
          be dealt a card after your opponents turn. Note that if at any point your score is
          exactly 20, you will stand automatically. At that point, your opponent can only
          LOSE or TIE for that round. Now get out there, and play some PAZAAK...
        </p>
        <p>

        </p>
      </main>
      <Link to='/' className="Button">Back</Link>
    </div>
  )
}

export default Rules
