import { backgroundVideoUrlContext } from '../App';
// Stylesheets
import './styles/About.css';
// Components
import Button from './Button';
// Libraries
import { useContext, useEffect } from 'react';
// Video
import AboutBackground from '../assets/video/AboutBackground.mkv'

function About(){

    const [backgroundVideoUrl, setBackgroundVideoUrl] = useContext(backgroundVideoUrlContext);

    useEffect(() => {
        setBackgroundVideoUrl(AboutBackground);
    }, []);

    return(
        <div class="About">
            <p>This isn't the page you're looking for...</p>
            <Button to="/">Back</Button>
        </div>
    )
}

export default About;