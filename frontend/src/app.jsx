import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import MediaList from './pages/media-list';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/media" element={<MediaList />} />
          <Route path="*" element={<h2>404 - Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
