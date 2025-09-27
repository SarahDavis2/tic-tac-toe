/* MAIN CODE */

// GameBoard
function GameBoard() {

    const board = [];

    const getBoard = () => board;
    const createBoard = () => {
        const SIZE = 3;   
        for (let i = 0; i < SIZE; i++) {
            board[i] = [];
            for (let j = 0; j < SIZE; j++) {
                board[i].push(Cell());
            }
        }
    }

    return {
        getBoard,
        createBoard,
    }
}



/* DOM - UI */