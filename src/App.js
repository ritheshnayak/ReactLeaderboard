import React, { useState } from 'react';
import './App.css';
import Dsaleaderboard from './components/Dsaleaderboard/Dsaleaderboard';
import Webleaderboard from './components/Webleaderboard/Webleaderboard';
import Aptileaderboard from './components/Aptileaderboard/Aptileaderboard';

function App() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState(null);

  const handleSelectLeaderboard = (leaderboard) => {
    setSelectedLeaderboard(leaderboard);
  };

  const handleBack = () => {
    setSelectedLeaderboard(null);
  };

  return (
    <div className="app-container">
      {!selectedLeaderboard ? (
        <div className="button-container">
          <button onClick={() => handleSelectLeaderboard('dsa')}>DSA Leaderboard</button>
          <button onClick={() => handleSelectLeaderboard('web')}>Web Leaderboard</button>
          <button onClick={() => handleSelectLeaderboard('apti')}>Aptitude Leaderboard</button>
        </div>
      ) : (
        <div className="leaderboard-container">
          <button onClick={handleBack} className="back-button">Back</button>
          {selectedLeaderboard === 'dsa' && <Dsaleaderboard />}
          {selectedLeaderboard === 'web' && <Webleaderboard />}
          {selectedLeaderboard === 'apti' && <Aptileaderboard />}
        </div>
      )}
    </div>
  );
}

export default App;
