// Stylesheets
import './styles/Nav.css';
// Components
import Button from './Button';
import ButtonLink from './ButtonLink';
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
                    <ButtonLink 
                        to={child.props.to} 
                        key={element}
                        style={{backgroundImage: `url(${child.props.backgroundImage || ''})`}}>
                            {child.props.children}
                    </ButtonLink>
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