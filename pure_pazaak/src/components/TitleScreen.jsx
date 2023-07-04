import { socket } from '../App';
// Stylesheets
import './styles/TitleScreen.css';
// Components
import Nav from './Nav';
import UsernameField from './UsernameField';
// Libraries
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
// Images
import FindGameImage from '../assets/FindGame.png';
import PrivateGameImage from '../assets/PrivateGame.png';
import AIGameImage from '../assets/AIGame.png';
import AboutImage from '../assets/About.png';

function TitleScreen() {

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('pull-into-session', (sessionName) => {
      navigate('/game/' + sessionName);
    })
    return () => {
      socket.off('pull-into-session');
    }
  }, []);

  const FindGame = () => {
    socket.emit('find-session');
  }

  const CreatePrivateGame = () => {
    socket.emit('create-private-session');
  }

  const CreateAIGame = () => {
    socket.emit('create-ai-session');
  }

  return (
    <div className="TitleScreen">
      <header>Pure Pazaak</header>
      <Nav>
        <button onClick={FindGame} backgroundImage={FindGameImage}>Find Game</button>
        <button onClick={CreatePrivateGame} backgroundImage={PrivateGameImage}>Private Game</button>
        <button onClick={CreateAIGame} backgroundImage={AIGameImage}>Play Against AI</button>
        <button to="/about" backgroundImage={AboutImage}>About</button>
      </Nav>
      <UsernameField />
    </div>
  )
}

export default TitleScreen;