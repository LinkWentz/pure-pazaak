import './BoardSum.css'
import { useState, useEffect } from 'react';

function BoardSum(props) {

    const [sum, setSum] = useState(0);

    useEffect(() => {
        setSum(props.board.reduce((x, e) => x + e, 0))
    }, [props])

    return(
        <div className="BoardSum">
            <p>{sum}</p>
        </div>
    )
}

export default BoardSum;