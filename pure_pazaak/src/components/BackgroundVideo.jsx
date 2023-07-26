// Stylesheets
import './styles/BackgroundVideo.css';
// Libraries
import { useRef, useEffect } from 'react';
// Images
import BackgroundSuspenseImage from '../assets/BackgroundSuspense.png'
// Videos
import DefaultVideo from '../assets/video/TitleScreenBackground.mkv';

function BackgroundVideo( { video } ) {

    const videoRef = useRef();

    const Play = () => {
        videoRef.current.play();
    }

    useEffect(() => {
        videoRef.current?.load();
        window.addEventListener('click', Play);
        return () => {
            window.removeEventListener('click', Play);
        }
    }, [video])

    return (
        <>
            <img src={BackgroundSuspenseImage}/>
            <video style={{backgroundImage: BackgroundSuspenseImage}} ref={videoRef} playsInline loop muted><source src={video || DefaultVideo} type={'video/mp4'}/></video>
        </>
    )
}

export default BackgroundVideo;