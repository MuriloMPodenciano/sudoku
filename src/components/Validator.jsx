import React from 'react';

const Validator = ({ board, inputtedNumbers }) => {
    const isValidSudoku = () => {
        const isValidRow = (row) => {
            const nums = new Set();
            for (let num of row) {
                if (num !== "-" && nums.has(num)) {
                    return false;
                }
                nums.add(num);
            }
            return true;
        };

        const isValidColumn = (colIndex) => {
            const nums = new Set();
            for (let row = 0; row < 9; row++) {
                const num = board[row][colIndex] !== '-' ? board[row][colIndex] : inputtedNumbers[row][colIndex];
                if (num !== "-" && nums.has(num)) {
                    return false;
                }
                nums.add(num);
            }
            return true;
        };

        const isValidBox = (startRow, startCol) => {
            const nums = new Set();
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const num = board[startRow + row][startCol + col] !== '-' ? board[startRow + row][startCol + col] : inputtedNumbers[startRow + row][startCol + col];
                    if (num !== "-" && nums.has(num)) {
                        return false;
                    }
                    nums.add(num);
                }
            }
            return true;
        };

        // Check all rows
        for (let row = 0; row < 9; row++) {
            const currentRow = board[row].split('').map((num, index) => num !== '-' ? num : inputtedNumbers[row][index]);
            if (!isValidRow(currentRow)) {
                return false;
            }
        }

        // Check all columns
        for (let col = 0; col < 9; col++) {
            if (!isValidColumn(col)) {
                return false;
            }
        }

        // Check all 3x3 boxes
        for (let row = 0; row < 9; row += 3) {
            for (let col = 0; col < 9; col += 3) {
                if (!isValidBox(row, col)) {
                    return false;
                }
            }
        }

        return true;
    };

    return (
        <div>
            <button onClick={() => alert(isValidSudoku() ? "Valid Sudoku!" : "Invalid Sudoku!")}>
                Validate Sudoku
            </button>
        </div>
    );
};

export default Validator;
