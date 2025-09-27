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

function Cell() {

    // initial val (an empty cell) is 0
    let val = 0;

    const getVal = () => val;
    const addVal = (player) => {
        val = player.val;
    }

    return {
        getVal,
        addVal, 
    };
}



/* DOM - UI */