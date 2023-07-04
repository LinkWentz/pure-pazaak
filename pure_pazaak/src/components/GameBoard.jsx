// Stylesheets
import './styles/GameBoard.css';
// Components
import Scoreboard from './Scoreboard';
import Board from './Board' ;
import Sidedeck from './Sidedeck';
import OpponentsSidedeck from './OpponentsSidedeck'
import Button from './Button';
import ButtonLink from './ButtonLink';
import BoardSum from './BoardSum';
import Username from './Username';
// Libraries
import { useParams } from "react-router-dom";

function GameBoard(props){

    const params = useParams();

    return(
        <div className={`GameBoard ${props.className}`}>
            <Scoreboard className="yourScoreboard" score={props.gameState["boards"]["you"]["points"]}/>
            <Username className="yourUsername">{window.localStorage.username}</Username>
            <BoardSum className="yourBoardSum" board={props.gameState["boards"]["you"]["board"]} stand={props.stand}/>
            
            <BoardSum className="opponentsBoardSum" board={props.gameState["boards"]["opponent"]["board"]}/>
            <Username className="opponentsUsername">{props.opponentsUsername}</Username>
            <Scoreboard className="opponentsScoreboard" score={props.gameState["boards"]["opponent"]["points"]}/>
            
            <Board className="yourBoard" cards={props.gameState["boards"]["you"]["board"]}/>
            <Board className="opponentsBoard" cards={props.gameState["boards"]["opponent"]["board"]}/>
            
            <Sidedeck className="yourSidedeck" cards={props.gameState["boards"]["you"]["sidedeck"]}></Sidedeck>
            <OpponentsSidedeck className="opponentsSidedeck" cardsCount={props.gameState["boards"]["opponent"]["sidedeckSize"]}/>

            <ButtonLink className="mainMenu" to="/">Main Menu</ButtonLink>
            <Button className="endTurn" onClick={props.endTurn}>End Turn</Button>
            <Button className="stand" onClick={props.stand}>Stand</Button>
        </div>
    )
}

export default GameBoard;