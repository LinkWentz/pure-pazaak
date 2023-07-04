// Stylesheets
import './styles/UsernameField.css';
// Libraries
import { useState, useEffect } from 'react';

function UsernameField() {

    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(window.localStorage.username || Math.round(Math.random() * 10**8).toString());
      }, []);

    useEffect(() => {
      window.localStorage.username = username;
    }, [username, setUsername]);

    const UpdateUsername = (event) => {
        setUsername(event.target.value);
    }

    return(
        <form className="UsernameField">
            <label htmlFor='username'>Username:</label>
            <input id='username' value={username} 
            onChange={UpdateUsername} spellCheck='false'
            autoComplete='false'/>
        </form>
    )
}

export default UsernameField;