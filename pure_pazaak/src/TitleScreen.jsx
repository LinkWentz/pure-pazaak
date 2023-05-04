import './TitleScreen.css';
import { Link, useNavigate } from "react-router-dom";
import { socket } from './App';

function TitleScreen() {

  const navigate = useNavigate();

  const JoinRoom = (event) => {
    event.preventDefault();
    const roomcode = event.target.roomcode.value;
    navigate('/game/' + roomcode);
  }

  return (
    <div className="TitleScreen">
      <header>Pure Pazaak</header>
      <main>
        <form onSubmit={JoinRoom}>
          <label>
            Room Code:
            <input type="input" name="roomcode" maxLength={4} autoComplete="off" pattern='[A-Za-z0-9]{4}' required/>
          </label>
          <input type="submit" value="Join" className="Button"/>
        </form>
        <Link to="rules" className="Button">Rules</Link>
      </main>
    </div>
  )
}

export default TitleScreen
