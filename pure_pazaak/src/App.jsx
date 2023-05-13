import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Starfield from './Starfield';
import TitleScreen from './TitleScreen';
import Rules from './Rules';
import About from './About';
import Game from './Game';
import { io } from 'socket.io-client';

export const socket = io.connect(`https://${window.location.hostname}:3333`, {transports: ['websocket']});

export default function App() {
  return (
    <div className="App">
      <Starfield count={1500}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitleScreen/>} />
          <Route path="/rules" element={<Rules/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/game/:roomcode" element={<Game/>} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}