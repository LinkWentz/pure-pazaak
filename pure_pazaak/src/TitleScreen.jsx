import './TitleScreen.css';
import Button from "./Button";
import ButtonLink from './ButtonLink';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { socket } from './App';

function TitleScreen() {

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('pull-into-session', (roomName) => {
      navigate('/game/' + roomName);
    })
    return () => {
      socket.off('pull-into-session');
    }
  }, []);

  const FindRoom = () => {
    socket.emit('find-room');
  }

  const CreatePrivateRoom = () => {
    socket.emit('create-private-room');
  }

  return (
    <div className="TitleScreen">
      <header>Pure Pazaak</header>
      <main>
        <Button onClick={FindRoom}>Find Game</Button>
        <Button onClick={CreatePrivateRoom}>Private Game</Button>
        <ButtonLink to="/rules">Rules</ButtonLink>
        <ButtonLink to="/about">About</ButtonLink>
      </main>
    </div>
  )
}

export default TitleScreen;