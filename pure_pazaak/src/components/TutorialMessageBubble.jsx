// Components
import Button from './Button';
// Libraries
import { useState, useEffect } from 'react';

function TutorialMessageBubble(props) {

    const [visible, setVisible] = useState(props.children ? true : false);

    useEffect(() => {
        setVisible(props.children ? true : false);
    }, [props.children])

    const Dismiss = () => {
        setVisible(false);
    }

    return (
        <div className="TutorialMessageBubble" 
        style={{position: "absolute", visibility: visible ? "visible":"hidden"}}>
            <p>{props.children}</p>
            <Button onClick={Dismiss}>Dismiss</Button>
        </div>
    )
}

export default TutorialMessageBubble;