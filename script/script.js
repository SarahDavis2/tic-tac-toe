/* MAIN CODE */
function GameBoard() {

    const SIZE = 3;   
    const board = [];
    const createBoard = (() => {
        for (let i = 0; i < SIZE; i++) {
            board[i] = [];
            for (let j = 0; j < SIZE; j++) {
                board[i].push(Cell());
            }
        }
    })();
    const renderBoard = () => {
        let strNewLine = '';
        for (let i = 0; i < SIZE; i++) {
            strNewLine = '';
            for (let j = 0; j < SIZE; j++) {
                strNewLine += `${board[i][j].getVal()}`;
            }
            console.log(strNewLine);
        }
    }
    const placeMarker = (player, row, col) => {
        board[row][col].addVal(player);
    }

    const getBoard = () => board;

    return {
        renderBoard,
        placeMarker,
        getBoard,
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

GameController();

function GameController() {
    gameBoard = GameBoard();
    players = Players();

    let activePlayer = '';
    const playTurn = (row, col) => {
        activePlayer = players.getActivePlayer();
        gameBoard.placeMarker(activePlayer, row, col);
        gameBoard.renderBoard();
        players.swapPlayerTurn();
    }

    playTurn(0, 0);
    playTurn(0, 1);
    playTurn(0, 2);
}

/* DOM - UI */