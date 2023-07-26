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

    const loadUsername = () => {
        setUsername(window.localStorage.username || randomUsername());
    }

    const UpdateUsername = (event) => {
        const input = event.target.value;

        if (input.length > 40){
            return
        }

        if (RegExp('[^a-zA-Z0-9\-\' ]').test(input)){
            return
        }

        setUsername(event.target.value);
    }

    useEffect(() => {
        loadUsername();
    }, []);

    useEffect(() => {
      window.localStorage.username = username;
    }, [username, setUsername]);

    return(
        <form className="UsernameField">
            <label htmlFor='username'>Username:</label>
            <input id='username' value={username} 
            onChange={UpdateUsername} onBlur={loadUsername} spellCheck='false'
            autoComplete='false'/>
        </form>
    )
}

export default UsernameField;