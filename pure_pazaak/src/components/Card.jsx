// Stylesheets
import './styles/Card.css'
// Libraries
import { useState, useEffect } from 'react';

function Card(props) {

    const [color, setColor] = useState("var(--defaultCardColor)");
    const [valueText, setValueText] = useState("0");

    useEffect(() => {
        if (!props.card) {
            return;
        }

        if (props.card.type == "sidedeck") {
            if (props.card.value > 0) {
                setColor("var(--positiveCardColor)");
                setValueText("+" + props.card.value);
            }
            else {
                setColor("var(--negativeCardColor)");
                setValueText("" + props.card.value);
            }
        }
        else {
            setValueText("" + props.card.value);
        }
    }, [props]);

    const onClick = () => {
        if (typeof props.onClick == 'function') {
            props.onClick(props.card);
        }
        else {
            return;
        }
    }

    if (props.card && props.card.value !== 0) {
        return (
            <div className={`Card ${props.acceptPointerEvents ? 'acceptPointerEvents' : ''}`} onClick={onClick}>
                <div className="glow" />
                <svg viewBox="0 0 200 270">
                    <path fill="var(--cardBorderColor)" d="M 180.15438,270 C 191.71189,270 200,261.71175 200,250.15424 V 19.845817 C 200,8.2883033 191.71189,0 180.15438,0 H 19.845817 C 8.2883036,0 0,8.2883033 0,19.845817 V 250.15424 C 0,261.71175 8.2883036,270 19.845817,270 h 6.484359 V 220.49042 H 173.67002 V 270 Z M 56.984119,90.585684 H 26.330176 V 38.607462 c 0,-5.033566 4.019112,-9.052677 9.052677,-9.052678 H 164.61734 c 5.03357,0 9.05268,4.019112 9.05268,9.052678 V 90.585684 H 143.01659 L 100.00062,47.56971 Z M 26.330176,135.00003 h 30.653426 l 43.016748,43.01676 43.01676,-43.01676 h 30.65291 v 63.28296 H 26.330176 Z" />
                    <path fill={color} d="M 26.330176,270 V 220.49042 H 173.67002 V 270 m -73.6694,-222.43029 43.01597,43.015974 h 30.65343 V 38.607462 c 0,-5.033566 -4.01911,-9.052678 -9.05268,-9.052678 H 35.382853 c -5.033565,10e-7 -9.052677,4.019112 -9.052677,9.052678 V 90.585684 H 56.984119 Z M 26.330176,198.28299 H 173.67002 V 135.00003 H 143.01711 L 100.00035,178.01679 56.983602,135.00003 H 26.330176 Z" />
                    <rect x="40" y="77.793" width="120" height="70" fill="black"></rect>
                    <text x="50%" y="116.793" dominantBaseline="middle" textAnchor="middle">{valueText}</text>
                </svg>
            </div>
        )
    }
    else {
        return (
            <div className="CardBack Card">
                <svg viewBox="0 0 200 270">
                    <path fill="var(--cardBorderColor)" d="M 180.15438,270 C 191.71189,270 200,261.71175 200,250.15424 V 19.845817 C 200,8.2883033 191.71189,0 180.15438,0 H 19.845817 C 8.2883036,0 0,8.2883033 0,19.845817 V 250.15424 C 0,261.71175 8.2883036,270 19.845817,270 h 6.484359 V 220.49042 H 173.67002 V 270 Z M 56.984119,90.585684 H 26.330176 V 38.607462 c 0,-5.033566 4.019112,-9.052677 9.052677,-9.052678 H 164.61734 c 5.03357,0 9.05268,4.019112 9.05268,9.052678 V 90.585684 H 143.01659 L 100.00062,47.56971 Z M 26.330176,135.00003 h 30.653426 l 43.016748,43.01676 43.01676,-43.01676 h 30.65291 v 63.28296 H 26.330176 Z" />
                    <path fill="var(--cardBackColor)" d="M 26.330176,270 V 220.49042 H 173.67002 V 270 m -73.6694,-222.43029 43.01597,43.015974 h 30.65343 V 38.607462 c 0,-5.033566 -4.01911,-9.052678 -9.05268,-9.052678 H 35.382853 c -5.033565,10e-7 -9.052677,4.019112 -9.052677,9.052678 V 90.585684 H 56.984119 Z M 26.330176,198.28299 H 173.67002 V 135.00003 H 143.01711 L 100.00035,178.01679 56.983602,135.00003 H 26.330176 Z" />
                </svg>
            </div>
        )
    }
}

export default Card;