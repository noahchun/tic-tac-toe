const gameBoard = (() => {
    const board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    function createBoardUI() {
        const boardContainer = document.getElementById('board-container');
        for (let i = 0; i < board.length; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.createElement('div');
                const className = 'cellRow' + (i + 1) + 'Col' +(j + 1);
                cell.classList.add(className);
                cell.textContent = board[i][j];
                boardContainer.append(cell);
            }
            //boardContainer.appendChild(row);
        }
    }
    return {
        board,
        createBoardUI
    };
})();

const boardContainer = document.getElementById('board-container');
gameBoard.createBoardUI();

