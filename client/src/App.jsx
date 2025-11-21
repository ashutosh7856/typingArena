import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
// Placeholders for now
import SinglePlayer from './pages/SinglePlayer';
import MultiplayerLobby from './pages/MultiplayerLobby';
import MultiplayerGame from './pages/MultiplayerGame';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/single" element={<SinglePlayer />} />
          <Route path="/multi" element={<MultiplayerLobby />} />
          <Route path="/game/:roomId" element={<MultiplayerGame />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
