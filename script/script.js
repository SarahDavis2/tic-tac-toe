/* MAIN CODE */

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

function Players(playerOneName = "Player 1", playerTwoName = "Player 2") {

    let players = [];
    const createPlayers = (() => {
        players.push(
            {
                name: playerOneName,
                val: 1,
                active: true,
            },
            {
                name: playerTwoName,
                val: 2,
                active: false,
            },
        );
    })();

    const swapPlayerTurn = () => {
        players.forEach(player => {
            player.active === true ? player.active = false : player.active = true;
        });
    }
    const getPlayer = (num) => players[num];
    const getActivePlayer = () => {
        return detActivePlayer = (() => players.find(player => player.active === true))();        
    }

    return {
        swapPlayerTurn,
        getPlayer, 
        getActivePlayer,
    }

}

// GameController
    // Create Gameboard()
    // getActivePlayer()
    // showBoard()
    // addMarker()
    // Determine Game End
        // Winner
    // Render

/* DOM - UI */