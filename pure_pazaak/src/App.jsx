// Stylesheets
import './App.css';
// Components
import TitleScreen from './components/TitleScreen';
import Tutorial from './components/Tutorial';
import About from './components/About';
import NetworkedGame from './components/NetworkedGame';
import BackgroundVideo from './components/BackgroundVideo';
// Libraries
import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { io } from 'socket.io-client';

export const socket = io.connect(`https://${window.location.hostname}:3333`, {transports: ['websocket']});

export const backgroundVideoUrlContext = createContext([null, () => {}]);

export default function App() {

  const [backgroundVideoUrl, setBackgroundVideoUrl] = useState(null);

  return (
    <div className="App">
      <backgroundVideoUrlContext.Provider value={[backgroundVideoUrl, setBackgroundVideoUrl]}>
        <BackgroundVideo video={backgroundVideoUrl} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TitleScreen/>} />
            <Route path="/tutorial" element={<Tutorial/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/game/:sessionName" element={<NetworkedGame/>} />
            <Route path="*" element={<Navigate to="/" replace/>} />
          </Routes>
        </BrowserRouter>
      </backgroundVideoUrlContext.Provider>
    </div>
  )
}