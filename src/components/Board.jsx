import React from 'react';
import './Board.css';

const Board = () => {
    var board = [
        "-95741386",
        "467839251",
        "831256974",
        "386195742",
        "712468539",
        "549327168",
        "653912874",
        "178543629",
        "924687153",
    ]

    return (
        <div>
            <h1>Sudoku</h1>
            <hr></hr>
            <div id='board'></div>
        </div>
    );
};

export default Board