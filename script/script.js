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
            if (checkLine.row === '' || checkLine.col === '') {
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
        if (checkVal === '') {
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
                if (board[i][j].getVal() === '') {
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
        if (board[row][col].getVal() === '') {
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
        getBoard,
    }
}

function Cell() {

    // initial val (an empty cell) is 0
    let val = '';

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

    const swapActivePlayer = () => {
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
                player = players[1];
            }
            return player;
        }
    const getName = (player) => player.name;
    const getActivePlayer = () => {
        return detActivePlayer = (() => players.find(player => player.active === true))();        
    }

    return {
        swapActivePlayer,
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
    let activePlayer = players.getActivePlayer();
    const playTurn = (row, col, player) => {
        gameBoard.placeMarker(activePlayer, row, col);
        console.log(`${players.getName(activePlayer)} Played.`);
    }
    let returnGameEnd = {
        tie: false,
        end: false,
    }

    // public
    const detAction = (row, col) => {
        activePlayer = players.getActivePlayer();
        console.log(`${players.getName(activePlayer)}'s Turn.`);
        if (gameBoard.isPlayable(row, col)) {
            playTurn(row, col, activePlayer);
            gameBoard.renderBoard();
            players.swapActivePlayer();

            let gameEnd = gameBoard.detGameEnd();
            // -1 = game not end; 3 = tie
            if (gameEnd === 3) {
                console.log("TIE!");
                returnGameEnd.tie = true;
            } else if (gameEnd !== -1) {
                players.selectWinner(gameEnd);
                winner = players.getWinner();
                console.log(`${players.getName(winner)} Wins!`);
                returnGameEnd.end = true;
            }
        }
    }
    const isTie = () => returnGameEnd.tie;
    const isWon = () => returnGameEnd.end;
    const getBoard = () => gameBoard.getBoard();
    const getActivePlayerName = () => players.getName(activePlayer);

    return {
        detAction,
        isTie,
        isWon,
        getBoard,
        getActivePlayerName,
    }
}

/* DOM - UI */
function ScreenController() {
    // current game
    const game = GameController();
    const board = game.getBoard();

    // dom
    const outputMsg = document.querySelector('.out-msg');
    const displayBoard = document.querySelector('.board');

    const renderScreen = () => {
        outputMsg.textContent = `${game.getActivePlayerName()}'s Turn.`;
        renderBoard();
    
        if (game.isTie()) {
            outputMsg.textContent = "It's a Tie!";
            disableBtns();
        } else if (game.isWon()) {
            outputMsg.textContent = `${game.getActivePlayerName()} Won!`;
            disableBtns();
        }
    }
    const renderBoard = () => {
        displayBoard.textContent = '';

        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                const newCell = document.createElement('button');
                newCell.textContent = `${cell.getVal()}`;
                newCell.dataset.row = i;
                newCell.dataset.col = j;
                displayBoard.appendChild(newCell);
            })
        })
    }
    const disableBtns = () => {
        const cellArr = displayBoard.querySelectorAll('button');
        cellArr.forEach((btn) => {
            btn.disabled = true;
        });
    }

    // Initial addEventListenter
    const addClickFtn = (() => {
        displayBoard.addEventListener("click", (e) => {
            const rowIndex = e.target.dataset.row;
            const colIndex = e.target.dataset.col;
            game.detAction(rowIndex, colIndex);
            renderScreen();
        })
    })();

    // Initial render
    renderScreen();
}

ScreenController();