// Stylesheets
import './styles/GameBoard.css';
// Components
import Scoreboard from './Scoreboard';
import Board from './Board' ;
import Sidedeck from './Sidedeck';
import OpponentsSidedeck from './OpponentsSidedeck'
import Button from './Button';
import BoardSum from './BoardSum';
import Username from './Username';

function GameBoard(props){

    return(
        <div className={`GameBoard ${props.className}`}>
            <Scoreboard className="yourScoreboard" score={props.gameState["boards"]["you"]["points"]}/>
            <Username className="yourUsername">{window.localStorage.username}</Username>
            <BoardSum className="yourBoardSum" value={props.gameState["boards"]["you"]["boardSum"]}/>
            
            <BoardSum className="opponentsBoardSum" value={props.gameState["boards"]["opponent"]["boardSum"]}/>
            <Username className="opponentsUsername">{props.opponentsUsername}</Username>
            <Scoreboard className="opponentsScoreboard" score={props.gameState["boards"]["opponent"]["points"]}/>
            
            <Board className="yourBoard" cards={props.gameState["boards"]["you"]["board"]}/>
            <Board className="opponentsBoard" cards={props.gameState["boards"]["opponent"]["board"]}/>
            
            <Sidedeck className="yourSidedeck" cards={props.gameState["boards"]["you"]["sidedeck"]} playCard={props.playCard}></Sidedeck>
            <OpponentsSidedeck className="opponentsSidedeck" cardsCount={props.gameState["boards"]["opponent"]["sidedeckSize"]}/>

            <Button className="mainMenu" to="/">Main Menu</Button>
            <Button className="endTurn" onClick={props.endTurn}>End Turn</Button>
            <Button className="stand" onClick={props.stand}>Stand</Button>
        </div>
    )
}

export default GameBoard;