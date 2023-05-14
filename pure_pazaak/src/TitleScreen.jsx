import './TitleScreen.css';
import Button from "./Button";
import ButtonLink from './ButtonLink';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { socket } from './App';

function TitleScreen() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(window.localStorage.username || Math.round(Math.random() * 10**8).toString());

    socket.on('pull-into-session', (roomName) => {
      navigate('/game/' + roomName);
    })
    return () => {
      socket.off('pull-into-session');
    }
  }, []);

  useEffect(() => {
    window.localStorage.username = username;
  }, [username, setUsername]);

  const FindRoom = () => {
    socket.emit('find-room');
  }

  const CreatePrivateRoom = () => {
    socket.emit('create-private-room');
  }

  const OnChange = (event) => {
    setUsername(event.target.value)
  }

  return (
    <div className="TitleScreen">
      <header>Pure Pazaak</header>
      <main>
        <Button onClick={FindRoom}>Find Game</Button>
        <Button onClick={CreatePrivateRoom}>Private Game</Button>
        <ButtonLink to="/rules">Rules</ButtonLink>
        <ButtonLink to="/about">About</ButtonLink>
        <input value={username} onChange={OnChange}/>
      </main>
    </div>
  )
}

export default TitleScreen;