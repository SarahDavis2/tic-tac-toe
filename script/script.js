/* MAIN CODE */
function GameBoard() {

    // private
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
    const detLineWin = () => {
        let countLine = {
            row: 0,
            col: 0,
        };
        let isMissing = false;
        for (let i = 0; i < SIZE; i++) {
            // reset number to track 3 consecutive vals
            countLine.row = 0;
            countLine.col = 0;
            
            // get the first val to determine if the entire line has the same value
            const checkLine = {
                row: board[i][0].getVal(),
                col: board[0][i].getVal(),
            }

            // edge case: if first val is 0 set countLine to not add to 3 (for game win condition)
            if (checkLine.row === 0 || checkLine.col === 0) {
                isMissing = true;
            }
            
            for (let j = 0; j < SIZE; j++) {
                if (board[i][j].getVal() === checkLine.row) {
                    countLine.row += 1;
                }
                if (board[j][i].getVal() === checkLine.col) {
                    countLine.col += 1;
                }
            }
            if (!isMissing) {
                if (countLine.row === 3 || countLine.col === 3) {
                    console.log("GAME ENDED");
                }
            }
        }
    }
    

    // public
    const detGameEnd = () => {
        detLineWin();
        // Add Diagonal Wind
        // Add Cat Tie
    }
    const isPlayable = (row, col) => {
        if (board[row][col].getVal() === 0) {
            return true;
        }
    }
    const placeMarker = (player, row, col) => {
        board[row][col].addVal(player);
    }
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
    const getBoard = () => board;

    return {
        detGameEnd,
        isPlayable,
        placeMarker,
        renderBoard,
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
    const getName = (player) => player.name;
    const getActivePlayer = () => {
        return detActivePlayer = (() => players.find(player => player.active === true))();        
    }

    return {
        swapPlayerTurn,
        getName,
        getActivePlayer,
    }
}

function GameController() {

    // private
    gameBoard = GameBoard();
    players = Players();
    let activePlayer = '';
    const playTurn = (row, col, player) => {
        gameBoard.placeMarker(activePlayer, row, col);
        console.log(`${players.getName(activePlayer)} Played.`);
    }

    // public
    const detAction = (row, col) => {
        activePlayer = players.getActivePlayer();
        console.log(`${players.getName(activePlayer)}'s Turn.`);
        if (gameBoard.isPlayable(row, col)) {
            playTurn(row, col, activePlayer);
            gameBoard.renderBoard();
            players.swapPlayerTurn();
            gameBoard.detGameEnd();
        }
    }

    return {
        detAction,
    }
}

game = GameController();

// ROW WIN
game.detAction(0, 0);
game.detAction(1, 0);
game.detAction(0, 1);
game.detAction(2, 0);
game.detAction(0, 2);

// COL WIN
// game.detAction(0, 0);
// game.detAction(0, 1);
// game.detAction(1, 0);
// game.detAction(0, 2);
// game.detAction(2, 0);

/* DOM - UI */