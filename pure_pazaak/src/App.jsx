// Stylesheets
import './App.css';
// Components
import CantinaVideo from './components/CantinaVideo';
import TitleScreen from './components/TitleScreen';
import Tutorial from './components/Tutorial';
import About from './components/About';
import NetworkedGame from './components/NetworkedGame';
// Libraries
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
          <Route path="/game/:sessionName" element={<NetworkedGame/>} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}