import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [resetKey, setResetKey] = useState(0);
  const [record, setRecord] = useState({ wins: 0, losses: 0 });

  const handleReset = () => {
    setResetKey(prev => prev + 1); // triggers re-mount of board
  };

  const handleGameEnd = (result) => {
    setRecord(prev => ({
      ...prev,
      [result]: prev[result] + 1
    }));
  };

  return (
    <div className="App">
      <h1>Minesweeper</h1>

      <div className="controls">
        <label>
          Difficulty:&nbsp;
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button onClick={handleReset}>Reset Game</button>
      </div>

      <div className="record">
        🏆 Wins: {record.wins} | 💀 Losses: {record.losses}
      </div>

      <Board
        key={resetKey} // forces re-render of board on reset
        difficulty={difficulty}
        onGameEnd={handleGameEnd}
      />
    </div>
  );
}

export default App;
