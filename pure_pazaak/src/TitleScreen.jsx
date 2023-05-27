import './TitleScreen.css';
import Button from "./Button";
import ButtonLink from './ButtonLink';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, Suspense } from 'react';
import { socket } from './App';

function TitleScreen() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(window.localStorage.username || Math.round(Math.random() * 10**8).toString());

    socket.on('pull-into-session', (sessionName) => {
      navigate('/game/' + sessionName);
    })
    return () => {
      socket.off('pull-into-session');
    }
  }, []);

  useEffect(() => {
    window.localStorage.username = username;
  }, [username, setUsername]);

  const FindRoom = () => {
    socket.emit('find-session');
  }

  const CreatePrivateRoom = () => {
    socket.emit('create-private-session');
  }

  const CreateAIGame = () => {
    socket.emit('create-ai-session');
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
        <Button onClick={CreateAIGame}>Create AI Game</Button>
        <ButtonLink to="/rules">Rules</ButtonLink>
        <ButtonLink to="/about">About</ButtonLink>
      </main>
      <form>
        <label htmlFor='username'>Username:</label>
        <input id='username' value={username} 
        onChange={OnChange} spellCheck='false'
        autoComplete='false'/>
      </form>
    </div>
  )
}

export default TitleScreen;