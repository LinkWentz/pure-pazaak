// Stylesheets
import './styles/BoardSum.css'
// Libraries
import { useEffect, useState } from 'react';
// Audio
import BustSound from '../assets/audio/mgs_warnbust.wav';

function BoardSum(props) {

    const [lastValue, setLastValue] = useState(0);

    useEffect(() => {
        if (props.value && props.value > 20 && props.value !== lastValue) {
            new Audio(BustSound).play();
        }
        setLastValue(props.value || 0);
    }, [props]);

    return(
        <div className={`BoardSum ${props.className}`}>
            <p>{props.value || 0}</p>
        </div>
    );
}

export default BoardSum;