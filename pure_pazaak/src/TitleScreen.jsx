import './TitleScreen.css';
import Button from "./Button";
import ButtonLink from './ButtonLink';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function TitleScreen() {

  const navigate = useNavigate();

  const [roomcode, setRoomcode] = useState("");

  const JoinRoom = () => {
      if (/[A-Za-z0-9]{4}/.test(roomcode)){
        navigate('/game/' + roomcode);
      }
  }

  const ChangeRoomcode = (value) => {
    if (value !== null) {
      for (const i in value.split("")){
        if (/[A-Za-z0-9]/.test(value[i])){
          continue
        }
        else {
          return
        }
      }
      setRoomcode(value);
    }
    else {
      setRoomcode(null);
    }
  }

  const onChange = (event) => {
    ChangeRoomcode(event.target.value);
  }

  const onKeyDown = (event) => {
    if (event.keyCode == 13) {
      JoinRoom();
    }
  }

  return (
    <div className="TitleScreen">
      <header>Pure Pazaak</header>
      <main>
        <input className="RoomcodeField" type="input" maxLength={4} 
        autoComplete="off" onChange={onChange} onKeyDown={onKeyDown}
        value={roomcode}/>
        <Button onClick={JoinRoom}>Join</Button>
        <ButtonLink to="/rules">Rules</ButtonLink>
        <ButtonLink to="/about">About</ButtonLink>
      </main>
    </div>
  )
}

export default TitleScreen;
