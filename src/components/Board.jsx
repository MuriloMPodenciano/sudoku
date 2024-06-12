import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = () => {
    const [board, setBoard] = useState([
        "--74916-5",
        "2---6-3-9",
        "-----7-1-",
        "-586----4",
        "--3----9-",
        "--62--187",
        "9-4-7---2",
        "67-83----",
        "81--45---"
    ]);

    useEffect(() => {
        const gameBoard = document.getElementById('board');

        for (let row = 0; row < 9; row++) {
          for (let column = 0; column < 9; column++) {
            const tile = document.createElement("div");
            tile.id = row.toString() + "-" + column.toString();

            if (board[row][column] != "-" ){
                tile.textContent = board[row][column];
                tile.classList.add("tile-start"); 
            }

            tile.classList.add("tile");
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