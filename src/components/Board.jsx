import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = () => {
    const [board, setBoard] = useState([
        "-95741386",
        "467839251",
        "831256974",
        "386195742",
        "712468539",
        "549327168",
        "653912874",
        "178543629",
        "924687153",
    ]);

    useEffect(() => {
        const gameBoard = document.getElementById('board');

        for (let row = 0; row < 9; row++) {
          for (let column = 0; column < 9; column++) {
            const tile = document.createElement("div");

            tile.id = row.toString() + "-" + column.toString();
            tile.classList.add("tile");
            
            tile.textContent = board[row][column]; 
            gameBoard.appendChild(tile);
          }
        }
      }, []);

    return (
        <div>
            <h1>Sudoku</h1>
            <hr></hr>
            <div id='board'></div>
        </div>
    );
};

export default Board;