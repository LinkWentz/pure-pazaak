import './CantinaVideo.css';
import backgroundVideo from './assets/cantina_background.mp4';

function CantinaVideo() {
    return (
        <video autoPlay loop muted>
            <source src={backgroundVideo} type='video/mp4'/>
        </video>
    )
}

export default CantinaVideo;