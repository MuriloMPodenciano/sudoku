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

    const [selectedTile, setSelectedTile] = useState(null);


    useEffect(() => {
        const gameBoard = document.getElementById('board');
        gameBoard.innerHTML = ''; 

        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                const tile = document.createElement("div");
                tile.id = row.toString() + "-" + column.toString();

            if (board[row][column] != "-" ){
                tile.textContent = board[row][column];
                tile.classList.add("tile-start"); 
            }else {
                tile.addEventListener("keydown", handleKeyDown);
            }
            tile.addEventListener('click', () => handleTileClick(row, column));

            if (row === 2 || row === 5) {
                tile.classList.add("horizontal-line");
            }
            if (column === 2 || column === 5) {
                tile.classList.add("vertical-line");
            }

            if (selectedTile[0] === row && selectedTile[1] === column) {
                tile.classList.add("selected");
            }

            tile.classList.add("tile");
            gameBoard.appendChild(tile);
            }
        }
    }, [board]);

    const handleTileClick = (row, column) => {
        const tile = document.getElementById(row.toString() + "-" + column.toString());
        if (!tile.classList.contains("tile-start")) {
            setSelectedTile([row, column]);
            tile.focus();
        } 
    };

    
    return (
        <div>
            <h1>Sudoku</h1>
            <hr></hr>
            <div id='board'></div>
        </div>
    );
};

export default Board;