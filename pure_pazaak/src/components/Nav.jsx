// Stylesheets
import './styles/Nav.css';
// Components
import Button from './Button';
// Libraries
import { useEffect, useState } from 'react';

function Nav({ children }) {

    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        const newButtons = [];

        for (const element in children){
            const child = children[element];

            if (child.props.hasOwnProperty("to")) {
                newButtons.push(
                    <Button 
                        to={child.props.to} 
                        key={element}
                        style={{backgroundImage: `url(${child.props.backgroundImage || ''})`}}>
                            {child.props.children}
                    </Button>
                );
            }
            else if (child.props.hasOwnProperty("onClick")) {
                newButtons.push(
                    <Button 
                        onClick={child.props.onClick} 
                        key={element}
                        style={{backgroundImage: `url(${child.props.backgroundImage || ''})`}}>
                            {child.props.children}
                    </Button>
                );
            }
        }

        setButtons(newButtons);
    }, []);

    return (
        <nav className="Nav">
            {buttons}
        </nav>
    );
}

export default Nav;