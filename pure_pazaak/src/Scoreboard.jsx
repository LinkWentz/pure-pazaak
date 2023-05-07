import "./Scoreboard.css";
import Point from './Point';

import { useState, useEffect } from 'react';

function Scoreboard(props) {

    const [colorPalette, setColorPalette] = useState({
        "scored": "var(--scoredPointColor)",
        "unscored": "var(--unscoredPointColor)"
    });
    const [pointColors, setPointColors] = useState(
        Array.from({length: props.maxScore || 3}, () => {colorPalette.unscored})
    );
    const [points, setPoints] = useState([]);

    useEffect(() => {
        setColorPalette({
            ...colorPalette,
            "scored": props.scoredColor || "var(--scoredPointColor)"
        })
    }, [props]);

    useEffect(() => {
        setColorPalette({
            ...colorPalette,
            "unscored": props.unscoredColor || "var(--unscoredPointColor)"
        })
    }, [props]);

    useEffect(() => {
        let newPointColors = [];
        for (const i in pointColors){
            if (i < props.score){
                newPointColors.push(colorPalette.scored);
            }
            else {
                newPointColors.push(colorPalette.unscored);
            }
        setPointColors(newPointColors);
        }

        let points = [];
        for (const i in pointColors){
            points.push(<Point key={"point_" + i} color={pointColors[i]}/>);
        }
        setPoints(points);
    }, [props]);

    return (
        <div className="Scoreboard">
            {points}
        </div>
    )
}

export default Scoreboard;