import React, { useState, useEffect } from 'react';
import './Board.css';
import Validator from './Validator';

const Board = () => {
    const [inputtedNumbers, setInputtedNumbers] = useState(Array(9).fill("").map(() => Array(9).fill("")));
    const [selectedTile, setSelectedTile] = useState([0, 0]);
    const [board, setBoard] = useState([]);


    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8000/board', {
                headers: {
                    Authorization: token
                }
            });
    
            const data = await response.json();
            if (response.ok) {
                setBoard(data.board);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching the board. Please try again.');
        }
    };
    
    fetchBoard();
    }, []);
   

    useEffect(() => {
        const gameBoard = document.getElementById('board');
        gameBoard.innerHTML = ''; 
        
        if (board.length === 0) {
            return; 
        }

        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                const tile = document.createElement("div");
                tile.id = row.toString() + "-" + column.toString();
                tile.tabIndex = 0;

            if (board[row][column] != "-" ){
                tile.textContent = board[row][column];
                tile.classList.add("tile-start"); 
            }else if (inputtedNumbers[row][column] !== "") {
                tile.textContent = inputtedNumbers[row][column];
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
    }, [board, selectedTile, inputtedNumbers]);


    useEffect(() => {
        const handleKeyDown = (event) => {
          if (selectedTile) {
            const [row, column] = selectedTile;
            if (event.key >= '1' && event.key <= '9') {
                const newInputtedNumbers = [...inputtedNumbers];
                newInputtedNumbers[row][column] = event.key;
                setInputtedNumbers(newInputtedNumbers);
                }
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedTile, inputtedNumbers]);


    const handleTileClick = (row, column) => {
        const tile = document.getElementById(row.toString() + "-" + column.toString());
        if (!tile.classList.contains("tile-start")) {
            setSelectedTile([row, column]);
            tile.focus();
        } 
    };    
    
    return (
        <div className='Board-div'>
            <h1>Sudoku</h1>
            <hr className='Board-hr'></hr>
            <h4>Regras padrões do sudoku se aplicam, adicionalmente, as diagonais não podem ter números repitidos</h4>
            <div id='board' className='Board-div'></div>
            <br></br>
            <Validator board={board} inputtedNumbers={inputtedNumbers} />
        </div>
    );
};

export default Board;