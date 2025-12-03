import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Progress from './pages/Progress';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default App;

