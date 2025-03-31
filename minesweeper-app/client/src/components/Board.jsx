import React, { useState } from 'react';
import Cell from './Cell';
import useMinesweeperBoard from '../hooks/useMinesweeperBoard';
import BombDefusalModal from './BombDefusalModal';
import defusalPrompts from '../utils/defusalPrompts';
import './Board.css';

const difficulty = 'medium';

export default function Board({ difficulty, onGameEnd }) {
  const {
    board,
    handleCellClick,
    bombTriggeredCoords,
    clearBombTrigger,
    markDefusalResult
  } = useMinesweeperBoard();

  console.log('Difficulty:', difficulty);


  const [showModal, setShowModal] = useState(false);
  const [defusalPrompt, setDefusalPrompt] = useState('');
  const [correctWire, setCorrectWire] = useState('');
  const [defusals, setDefusals] = useState({ success: 0, fail: 0 });

  const handleClick = (row, col) => {
    const cell = board[row][col];

    // ⛔ Prevent clicking already revealed or defused bombs
    if (cell.isRevealed || cell.defused !== null) return;

    const triggered = handleCellClick(row, col);
    if (triggered?.isBomb) {
      const pool = defusalPrompts[difficulty];
      const { prompt, correct } = pool[Math.floor(Math.random() * pool.length)];

      setDefusalPrompt(prompt);
      setCorrectWire(correct);
      setShowModal(true);
    }
  };

  const handleWireChoice = (color) => {
    if (!bombTriggeredCoords) return;

    const { row, col } = bombTriggeredCoords;

    if (color === correctWire) {
      alert('✅ You defused the bomb!');
      setDefusals((prev) => ({ ...prev, success: prev.success + 1 }));
      markDefusalResult(row, col, 'success');
    } else {
      alert('💥 Boom! Game Over.');
      setDefusals((prev) => ({ ...prev, fail: prev.fail + 1 }));
      markDefusalResult(row, col, 'fail');
    }

    setShowModal(false);
    clearBombTrigger();
  };

  return (
    <>
      <div className="defusal-stats">
        <p>✅ Defusals: {defusals.success} | 💥 Failed: {defusals.fail}</p>
      </div>

      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                cell={cell}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      {showModal && (
        <BombDefusalModal
        prompt={defusalPrompt}
        correctWire={correctWire}
        onChooseWire={handleWireChoice}
        onClose={() => {
          setShowModal(false);
          clearBombTrigger();
        }}
        onTimeout={() => {
          alert('⏰ Time’s up! The bomb exploded!');
          if (bombTriggeredCoords) {
            markDefusalResult(bombTriggeredCoords.row, bombTriggeredCoords.col, 'fail');
          }
          setShowModal(false);
          clearBombTrigger();
          setDefusals((prev) => ({ ...prev, fail: prev.fail + 1 }));
        }}
      />
      
      )}
    </>
  );
}
