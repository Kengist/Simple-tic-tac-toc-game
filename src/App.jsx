import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board
  const [isXNext, setIsXNext] = useState(true); // Toggle between X and O
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    // Ignore click if cell is filled or game is won
    if (board[index] || winner) return;

    // Update board
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null)); // Clear the board
    setIsXNext(true); // Reset to X's turn
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell === "X" ? "x" : cell === "O" ? "o" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : board.includes(null)
          ? `Next Player: ${isXNext ? "X" : "O"}`
          : "It's a Draw!"}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

// Calculate winner function
function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default App;
