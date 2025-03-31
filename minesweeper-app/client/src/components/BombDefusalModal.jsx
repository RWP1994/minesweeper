import React, { useEffect, useState } from 'react';
import './BombDefusalModal.css';

const wireColors = ['red', 'blue', 'green'];

export default function BombDefusalModal({ prompt, correctWire, onChooseWire, onClose, onTimeout }) {
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeout(); // Detonate if time runs out
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, onTimeout]);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>💣 Bomb Defusal Challenge</h2>
        <p className="instruction"><strong>Pick a wire to cut!</strong></p>
        <p className="prompt">{prompt}</p>

        <div className="wires">
          {wireColors.map((color) => (
            <button
              key={color}
              className={`wire-btn ${color}`}
              onClick={() => onChooseWire(color)}
            >
              {color.toUpperCase()} Wire
            </button>
          ))}
        </div>

        <p className="timer">⏱️ Time left: {secondsLeft}s</p>

        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
