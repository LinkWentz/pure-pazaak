import { socket, backgroundVideoUrlContext } from '../App';
// Stylesheets
import './styles/TitleScreen.css';
// Components
import Nav from './Nav';
import UsernameField from './UsernameField';
// Libraries
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
// Images
import FindGameImage from '../assets/FindGame.png';
import PrivateGameImage from '../assets/PrivateGame.png';
import AIGameImage from '../assets/AIGame.png';
import TutorialImage from '../assets/Tutorial.png';
import AboutImage from '../assets/About.png';
// Video
import TitleScreenBackground from '../assets/video/TitleScreenBackground.mkv';

function TitleScreen() {

    const navigate = useNavigate();

    const [backgroundVideoUrl, setBackgroundVideoUrl] = useContext(backgroundVideoUrlContext);

    useEffect(() => {
        setBackgroundVideoUrl(TitleScreenBackground);
    }, []);

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
                <button to="/tutorial" backgroundImage={TutorialImage}>Tutorial</button>
                <button to="/about" backgroundImage={AboutImage}>About</button>
            </Nav>
            <UsernameField />
        </div>
    )
}

export default TitleScreen;