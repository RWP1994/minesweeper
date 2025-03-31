import React from 'react';
import './Cell.css';

export default function Cell({ cell, onClick }) {
  const { isRevealed, isBomb, adjacentBombs } = cell;

  let content = '';
  let className = 'cell';

if (cell.isRevealed) {
  className += ' revealed';
  if (cell.defused === 'success') {
    content = '✔️';
    className += ' defused-success';
  } else if (cell.defused === 'fail') {
    content = '💥';
    className += ' defused-fail';
  } else if (cell.isBomb) {
    content = '💣';
  } else if (cell.adjacentBombs > 0) {
    content = cell.adjacentBombs;
    className += ` number-${adjacentBombs}`;
  }
}


return (
  <div className={className} onClick={onClick}>
    {content}
  </div>
);

}
