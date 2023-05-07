import './Starfield.css';
import { useState, useEffect } from 'react';

function Starfield(props){

    const [stars, setStars] = useState([]);

    useEffect(() => {
        let newStars = [];

        for (const i in [...Array(props.count || 100)]) {
            newStars.push(<div 
                key={"star_" + i}
                style={{
                    height: Math.random()/8 + "%",
                    aspectRatio: 1,
                    position: "absolute",
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                    backgroundColor: "var(--starColor)"
                }}
            />);
        }

        setStars(newStars);
    }, []);
    
    const [x, setX] = useState();
    const [y, setY] = useState();

    useEffect(() => {
        const update = (e) => {
            setX(e.x / window.innerWidth);
            setY(e.y / window.innerHeight);
        }
        window.addEventListener('mousemove', update);
        window.addEventListener('touchmove', update);
        return () => {
            window.removeEventListener('mousemove', update);
            window.removeEventListener('touchmove', update);
        }
    }, []);

    return(
        <div className="Starfield" style={{top: -5 + y + "%", left: -5 + x + "%"}}>
            <div className="stars">
                {stars}
            </div>
        </div>
    )
}

export default Starfield;