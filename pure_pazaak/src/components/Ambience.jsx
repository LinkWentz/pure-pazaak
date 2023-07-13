// Stylesheets
import './styles/Ambience.css';
// Images
import MutedIcon from '../assets/muted.png';
import UnmutedIcon from '../assets/unmuted.png';
// Audio
import CantinaWalla from '../assets/audio/cantinawalla.wav';

import { useRef, useEffect, useState } from 'react';

function Ambience() {
    const [muted, setMuted] = useState(false);

    const cantinaWalla = useRef(new Audio(CantinaWalla));
    cantinaWalla.current.loop = true;

    const Play = () => {
        cantinaWalla.current.play();
    }

    const Pause = () => {
        cantinaWalla.current.pause();
    }

    useEffect(() => {
        if (!muted) {
            window.addEventListener('click', Play);
        }
        else {
            Pause();
        }
        return () => {
            window.removeEventListener('click', Play);
        }
    }, [muted]);

    return(
        <div className="MuteButton" onClick={() => setMuted(!muted)} style={{backgroundImage: `url(${muted ? MutedIcon : UnmutedIcon})`}} />
    )
}

export default Ambience;