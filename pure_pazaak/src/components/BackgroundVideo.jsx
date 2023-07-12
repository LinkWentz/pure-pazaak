// Stylesheets
import './styles/BackgroundVideo.css';
// Libraries
import { useRef, useEffect } from 'react';
// Images
import BackgroundSuspenseImage from '../assets/BackgroundSuspense.png'
// Videos
import DefaultVideo from '../assets/video/TitleScreenBackground.mkv';

const TestSuspense = () => {
    throw new Promise(() => {});
}


function BackgroundVideo( { video } ) {

    const videoRef = useRef();
    
    useEffect(() => {
        videoRef.current?.load();
    }, [video])

    return (
        <>
            <img src={BackgroundSuspenseImage}/>
            <video style={{backgroundImage: BackgroundSuspenseImage}} ref={videoRef} autoPlay loop muted><source src={video || DefaultVideo} type={'video/mp4'}/></video>
        </>
    )
}

export default BackgroundVideo;