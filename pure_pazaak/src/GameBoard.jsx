import './GameBoard.css';
import Spacer from './Spacer';
import Scoreboard from './Scoreboard';
import Board from './Board' ;
import Sidedeck from './Sidedeck';
import OpponentsSidedeck from './OpponentsSidedeck'
import Button from './Button';
import ButtonLink from './ButtonLink';
import BoardSum from './BoardSum';
import Username from './Username';
import { useParams } from "react-router-dom";
import { socket } from './App';

function GameBoard(props){

    const params = useParams();
  
    const EndTurn = () => {
      socket.emit('game-event', 'end turn', params['roomcode']);
    };
  
    const Stand = () => {
      socket.emit('game-event', 'stand', params['roomcode']);
    };

    return(
        <div className="GameBoard">
            <Scoreboard score={props.gameState["boards"]["you"]["points"]}/>
            <Username>{window.localStorage.username}</Username>
            <BoardSum board={props.gameState["boards"]["you"]["board"]}/>
            <Spacer/>
            <BoardSum board={props.gameState["boards"]["opponent"]["board"]}/>
            <Username>{props.opponentsUsername}</Username>
            <Scoreboard score={props.gameState["boards"]["opponent"]["points"]}/>

            <Spacer/>
            <Board cards={props.gameState["boards"]["you"]["board"]}/>
            <Spacer/>
            <Board cards={props.gameState["boards"]["opponent"]["board"]}/>
            <Spacer/>

            <Spacer/>
            <Sidedeck cards={props.gameState["boards"]["you"]["sidedeck"]}></Sidedeck>
            <Spacer/>
            <OpponentsSidedeck cardsCount={props.gameState["boards"]["opponent"]["sidedeckSize"]}/>
            <Spacer/>

            <ButtonLink to="/">Main Menu</ButtonLink>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Button onClick={EndTurn}>End Turn</Button>
            <Button onClick={Stand}>Stand</Button>
        </div>
    )
}

export default GameBoard;