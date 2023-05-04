import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import TitleScreen from './TitleScreen'
import Rules from './Rules'
import Game from './Game'
import { io } from 'socket.io-client';
import { useEffect } from 'react';

export const socket = io(`http://${window.location.hostname}:3333`);

export default function App() {

  useEffect(() => {
    console.log(window.location.hostname);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitleScreen />}/>
          <Route path="/rules" element={<Rules />}/>
          <Route path="/game/:roomcode" element={<Game />}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}