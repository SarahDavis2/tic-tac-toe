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
        // default -1 means game has not ended
        let returnVal = -1;
        for (let i = 0; i < SIZE; i++) {
            // reset number to track 3 consecutive vals
            countLine.row = 0;
            countLine.col = 0;
            
            // get the first val to determine if the entire line has the same value
            const checkLine = {
                row: board[i][0].getVal(),
                col: board[0][i].getVal(),
            }

            // edge case: val to determine is missing
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
                    isEnd = true;
                    if (countLine.row === 3) {
                        returnVal = checkLine.row;
                    } else {
                        returnVal = checkLine.col;
                    }
                }
            }
        }
        return returnVal;
    }
    const detDiagonalWin = () => {
        let countLine = {
            left: 0,
            right: 0,
        }
        let isMissing = false;
        // default -1 means game has not ended
        let returnVal = -1;

        // get the middle val of board to determine if the entire line has the same value
        const checkVal = board[1][1].getVal();
        // edge case: val to determine is missing
        if (checkVal === 0) {
            isMissing = true;
        }

        const detLeftWin = (() => {
            for (let i = 0; i < SIZE; i++) {
                if (board[i][i].getVal() === checkVal) {
                    countLine.left += 1;
                }
            } 
        })();
        const detRightWin = (() => {
            for (let i = 0; i < SIZE; i++) {
                let j = SIZE - 1 - i;
                if (board[i][j].getVal() === checkVal) {
                    countLine.right += 1;
                }
            }
        })();

        if (!isMissing) {
            if (countLine.left === 3 || countLine.right === 3) {
                isEnd = true;
                returnVal = checkVal;
            }
        }
        return returnVal;
    }
    const detTie = () => {
        let isTie = true;

        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (board[i][j].getVal() === 0) {
                    isTie = false;
                }
            }
        }
        return isTie;
    }

    // public
    const detGameEnd = () => {
        let lnWin = detLineWin();
        let diagWin = detDiagonalWin();
        // if default -1 then game did not end
        let returnWinner = -1;

        if (lnWin !== -1) {
            returnWinner = lnWin;
        } else if (diagWin !== -1) {
            returnWinner = diagWin;
        } else if (detTie()) {
            // 3 determines game is tie
            returnWinner = 3;
        }
        return returnWinner;
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
                val: "x",
                active: true,
                winner: false,
            },
            {
                name: playerTwoName,
                val: "o",
                active: false,
                winner: false,
            },
        );
    })();

    const swapPlayerTurn = () => {
        players.forEach(player => {
            player.active === true ? player.active = false : player.active = true;
        });
    }
    const selectWinner = (winVal) => {
        if (players[0].val === winVal) {
            players[0].winner = true;
        } else {
            players[1].winner = true;
        }
    }
    const getWinner = () => {
            let player = players[0];
            if (players[1].winner === true) {
                player = player[1];
            }
            return player;
        }
    const getName = (player) => player.name;
    const getActivePlayer = () => {
        return detActivePlayer = (() => players.find(player => player.active === true))();        
    }

    return {
        swapPlayerTurn,
        selectWinner,
        getWinner,
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

            let gameEnd = gameBoard.detGameEnd();
            // -1 = game not end; 3 = tie
            if (gameEnd === 3) {
                console.log("TIE!");
            } else if (gameEnd !== -1) {
                players.selectWinner(gameEnd);
                winner = players.getWinner();
                console.log(`${players.getName(winner)} Wins!`);
            }
        }
    }

    return {
        detAction,
    }
}

game = GameController();

// ROW WIN
// game.detAction(0, 0);
// game.detAction(1, 0);
// game.detAction(0, 1);
// game.detAction(2, 0);
// game.detAction(0, 2);

// COL WIN
// game.detAction(0, 0);
// game.detAction(0, 1);
// game.detAction(1, 0);
// game.detAction(0, 2);
// game.detAction(2, 0);

// DIAGONAL WIN
// game.detAction(0, 0);
// game.detAction(1, 0);
// game.detAction(1, 1);
// game.detAction(2, 0);
// game.detAction(2, 2);

// game.detAction(0, 2);
// game.detAction(1, 0);
// game.detAction(1, 1);
// game.detAction(2, 2);
// game.detAction(2, 0);

// TIE
game.detAction(0, 0);
game.detAction(1, 0);
game.detAction(0, 1);
game.detAction(0, 2);
game.detAction(1, 1);
game.detAction(2, 2);
game.detAction(2, 0);
game.detAction(2, 1);
game.detAction(1, 2);

/* DOM - UI */