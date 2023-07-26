// Stylesheets
import './styles/UsernameField.css';
// Libraries
import { useState, useEffect } from 'react';

function UsernameField() {

    const [username, setUsername] = useState("");

    const randomUsername = () => {
        const defaultUsernames = [
            'Mission Vao',
            'Carth Onasi',
            'T3-M4',
            'Atton Rand',
            'Gelrood',
            'Niklos',
            'Sol\'aa',
            'Fodo Medoo',
            'Toll Apkar',
            'Jolan Aphett',
            'Gonto Yas',
            'Furko Nellis',
            'Kudos',
            'Suvam Tam',
            'Mebla Dule',
            'Doton Het',
            'Nikko',
            'S4-C8',
            'Dahnis',
            'Geredi',
            'The Champ'
        ];
        return defaultUsernames[Math.round(Math.random() * (defaultUsernames.length + 1)) - 1];
    }

    useEffect(() => {
        setUsername(window.localStorage.username || randomUsername());
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