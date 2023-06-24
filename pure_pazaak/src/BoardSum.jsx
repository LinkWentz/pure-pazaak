import './BoardSum.css'
import { useState, useEffect } from 'react';

function BoardSum(props) {

    const [sum, setSum] = useState(0);

    useEffect(() => {
        setSum(props.board.reduce((x, e) => x + e.value, 0))
    }, [props])

    useEffect(() => {
        if (sum == 20 && props.stand) {
            props.stand();
        }
    }, [sum, setSum])

    return(
        <div className={`BoardSum ${props.className}`}>
            <p>{sum}</p>
        </div>
    )
}

export default BoardSum;