const gameBoard = (() => {
    const board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];
    let currentPlayer;
    let gameStatus = document.querySelector(".game-status");
    function createBoardUI() {
        currentPlayer = playerFactory("Player1", "X");
        const boardContainer = document.getElementById('board-container');
        for (let i = 0; i < board.length; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.createElement('div');
                const cellName = 'row' + (i + 1) + 'col' + (j + 1);
                cell.classList.add(cellName);
                cell.classList.add('cell');
                cell.textContent = board[i][j];
                // sets currentPlayer to clicked cell
                cell.addEventListener("click", function() {
                    if (!cell.classList.contains("markedPlayer1") && !cell.classList.contains("markedPlayer2")) {
                        cell.textContent = currentPlayer.marker;
                        cell.classList.add('marked' + currentPlayer.name);
                        // switch currentPlayer after cell is clicked
                        switchPlayer(cell);
                    }
                    //cell.textContent = currentPlayer.marker;
                });
                
                boardContainer.append(cell);
            }
            //boardContainer.appendChild(row);
        }
    }

    function switchPlayer(clickedCell) {
        console.log(currentPlayer.name);
        const currentCell = clickedCell;
        let cell = document.querySelectorAll(".cell");
        let gameOver = false;
        if (currentCell.classList.contains("markedPlayer1")) {
            currentPlayer = playerFactory("Player2", "O");
            gameStatus.textContent = currentPlayer.name + "'s turn. (" + currentPlayer.marker + ")";
        } else {
            currentPlayer = playerFactory("Player1", "X");
            gameStatus.textContent = currentPlayer.name + "'s turn. (" + currentPlayer.marker + ")";
        }
        let cell1, cell2, cell3;
        const winConditions = [
            ["row1col1", "row1col2", "row1col3"], // Rows
            ["row2col1", "row2col2", "row2col3"],
            ["row3col1", "row3col2", "row3col3"],
            ["row1col1", "row2col1", "row3col1"], // Columns
            ["row1col2", "row2col2", "row3col2"],
            ["row1col3", "row2col3", "row3col3"],
            ["row1col1", "row2col2", "row3col3"], // Diagonals
            ["row1col3", "row2col2", "row3col1"]
        ];
        // check rows
        for (let i = 0; i <= 2; i++) {
            const rowCells = [];
            for (let j = 0; j <= 2; j++) {
                const cell = document.querySelector("." + winConditions[i][j]);
                rowCells.push(cell);
            }
            if (rowCells.every(cell => cell.classList.contains("markedPlayer1"))) {
                gameStatus.textContent = "PLAYER1 is the winner!";
                boardContainer.classList.add('disable-click');
            } else if (rowCells.every(cell => cell.classList.contains("markedPlayer2"))) {
                gameStatus.textContent = "PLAYER2 is the winner!";
                boardContainer.classList.add('disable-click');
            }
            rowCells.length = 0;
        }
        // check columns
        for (let i = 3; i <= 5; i++) {
            const colCells = [];
            for (let j = 0; j <= 2; j++) {
                const cell = document.querySelector("." + winConditions[i][j]);
                colCells.push(cell);
            }
            if (colCells.every(cell => cell.classList.contains("markedPlayer1"))) {
                gameStatus.textContent = "PLAYER1 is the winner!";
                boardContainer.classList.add('disable-click');
            } else if (colCells.every(cell => cell.classList.contains("markedPlayer2"))) {
                gameStatus.textContent = "PLAYER2 is the winner!";
                boardContainer.classList.add('disable-click');
            }
            colCells.length = 0;
        }
        // check diagonals
        for (let i = 6; i <= 7; i++) {
            let diagCells = [];
            for (let j = 0; j <= 2; j++) {
                const cell = document.querySelector("." + winConditions[i][j]);
                diagCells.push(cell);
            }
            if (diagCells.every(cell => cell.classList.contains("markedPlayer1"))) {
                gameStatus.textContent = "PLAYER1 is the winner!";
                boardContainer.classList.add('disable-click');
            } else if (diagCells.every(cell => cell.classList.contains("markedPlayer2"))) {
                gameStatus.textContent = "PLAYER2 is the winner!";
                boardContainer.classList.add('disable-click');
            }
            diagCells.length = 0;
        }
        // check for draw
        for (let i = 0; i <= 7; i++) {
            let drawCells = [];
            for (let j = 0; j <= 2; j++) {
                const cell = document.querySelector("." + winConditions[i][j]);
                drawCells.push(cell);
            }
            if (drawCells.every(cell => cell.classList.contains("markedPlayer1")) || drawCells.every(cell => cell.classList.contains("markedPlayer2"))) {
                gameStatus.textContent = "DRAW!";
                boardContainer.classList.add('disable-click');
            }
        }
    }

    function removeClickListeners() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.removeEventListener('click', cellClick)
        })
    }

    return {
        board,
        createBoardUI,
        switchPlayer
    };
})();

const playerFactory = (name, marker) => {
    const showMarker = () => console.log(marker);
    return {name, marker};
}

const boardContainer = document.getElementById('board-container');
gameBoard.createBoardUI();



