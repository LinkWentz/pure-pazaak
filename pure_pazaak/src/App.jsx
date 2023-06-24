import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CantinaVideo from './CantinaVideo';
import TitleScreen from './TitleScreen';
import Tutorial from './Tutorial';
import About from './About';
import Game from './Game';
import { io } from 'socket.io-client';

export const socket = io.connect(`https://${window.location.hostname}:3333`, {transports: ['websocket']});

export default function App() {
  return (
    <div className="App">
      <CantinaVideo />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitleScreen/>} />
          <Route path="/tutorial" element={<Tutorial/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/game/:sessionName" element={<Game/>} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}