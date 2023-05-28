import "./Scoreboard.css";
import Point from './Point';

import { useState, useEffect } from 'react';

function Scoreboard(props) {

    const [points, setPoints] = useState([]);

    useEffect(() => {
        let points = Array.from({length: props.maxScore || 3});
        for (const i in points){
            if (i < props.score) {
                points[i] = <Point key={"point_" + i} color="var(--scoredPointColor)"/>
            }
            else {
                points[i] = <Point key={"point_" + i} color="var(--unscoredPointColor)"/>
            }
        }
        setPoints(points);
    }, [props.score]);

    return (
        <div className={`Scoreboard ${props.className}`}>
            {points}
        </div>
    )
}

export default Scoreboard;