import { useState, useEffect } from 'react';

const BOARD_SIZE = 10;
const NUM_MINES = 10;

function generateEmptyBoard(size) {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => ({
      row,
      col,
      isBomb: false,
      isRevealed: false,
      adjacentBombs: 0,
      defused: null, // Added for defusal tracking
    }))
  );
}

function placeMines(board, numMines) {
  const size = board.length;
  let placed = 0;
  while (placed < numMines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (!board[row][col].isBomb) {
      board[row][col].isBomb = true;
      placed++;
    }
  }
  return board;
}

function calculateAdjacency(board) {
  const dirs = [-1, 0, 1];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      let count = 0;
      dirs.forEach(dy => {
        dirs.forEach(dx => {
          if (dy === 0 && dx === 0) return;
          const y = row + dy;
          const x = col + dx;
          if (
            y >= 0 &&
            y < board.length &&
            x >= 0 &&
            x < board[0].length &&
            board[y][x].isBomb
          ) {
            count++;
          }
        });
      });
      board[row][col].adjacentBombs = count;
    }
  }
  return board;
}

export default function useMinesweeperBoard() {
  const [board, setBoard] = useState([]);
  const [bombTriggeredCoords, setBombTriggeredCoords] = useState(null);

  useEffect(() => {
    let newBoard = generateEmptyBoard(BOARD_SIZE);
    newBoard = placeMines(newBoard, NUM_MINES);
    newBoard = calculateAdjacency(newBoard);
    setBoard(newBoard);
  }, []);

  const revealCell = (r, c) => {
    const updatedBoard = board.map(row => row.map(cell => ({ ...cell })));
    const stack = [[r, c]];

    while (stack.length) {
      const [row, col] = stack.pop();
      const cell = updatedBoard[row][col];
      if (cell.isRevealed) continue;
      cell.isRevealed = true;

      if (cell.adjacentBombs === 0 && !cell.isBomb) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nr = row + dy;
            const nc = col + dx;
            if (
              nr >= 0 &&
              nr < BOARD_SIZE &&
              nc >= 0 &&
              nc < BOARD_SIZE &&
              !updatedBoard[nr][nc].isRevealed
            ) {
              stack.push([nr, nc]);
            }
          }
        }
      }
    }

    setBoard(updatedBoard);
  };

  const handleCellClick = (row, col) => {
    const cell = board[row][col];
    if (cell.isRevealed) return;

    if (cell.isBomb) {
      setBombTriggeredCoords({ row, col });
      return { isBomb: true };
    } else {
      revealCell(row, col);
    }
  };

  const markDefusalResult = (row, col, result) => {
    const updatedBoard = board.map((r) => r.map((cell) => ({ ...cell })));
    updatedBoard[row][col].defused = result;
    updatedBoard[row][col].isRevealed = true;
    setBoard(updatedBoard);
  };

  return {
    board,
    handleCellClick,
    bombTriggeredCoords,
    clearBombTrigger: () => setBombTriggeredCoords(null),
    markDefusalResult
  };
}
