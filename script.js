const gameBoard = (() => {
    const board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];
    let currentPlayer;
    function createBoardUI() {
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
                cell.addEventListener("click", function() {
                    if (currentPlayer) {
                        cell.textContent = currentPlayer.marker;
                        cell.classList.add('marked' + currentPlayer.name);
                    }
                    //cell.textContent = currentPlayer.marker;
                });
                
                boardContainer.append(cell);
            }
            //boardContainer.appendChild(row);
        }
    }

    function playGame() {
        currentPlayer = playerFactory("Player1", "X");
        console.log(currentPlayer.name);
    }

    return {
        board,
        createBoardUI,
        playGame
    };
})();

const playerFactory = (name, marker) => {
    const showMarker = () => console.log(marker);
    return {name, marker};
}

const boardContainer = document.getElementById('board-container');
gameBoard.createBoardUI();
gameBoard.playGame();

//const player1 = document.getElementById('name1').value;


