document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const gameSection = document.getElementById('game');
    const aiModeButton = document.getElementById('ai-mode');
    const twoPlayerModeButton = document.getElementById('two-player-mode');
    const cells = document.querySelectorAll('.cell');
    const turnIndicator = document.getElementById('turn-indicator');
    const winnerText = document.getElementById('winner-text');
    const restartButton = document.getElementById('restart');
    
    let currentPlayer = 'X';
    let aiMode = false;

    const resetBoard = () => {
        cells.forEach(cell => cell.innerText = '');
        winnerText.innerText = '';
        currentPlayer = 'X';
        updateTurnIndicator();
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                cells[a].innerText &&
                cells[a].innerText === cells[b].innerText &&
                cells[a].innerText === cells[c].innerText
            ) {
                return cells[a].innerText;
            }
        }
        return null;
    };

    const updateTurnIndicator = () => {
        if (currentPlayer === 'X') {
            turnIndicator.innerText = "Player X's turn";
            document.body.classList.add('player-x');
            document.body.classList.remove('player-o');
        } else {
            turnIndicator.innerText = "Player O's turn";
            document.body.classList.add('player-o');
            document.body.classList.remove('player-x');
        }
    };

    const aiMove = () => {
        const emptyCells = Array.from(cells).filter(cell => !cell.innerText);
        if (emptyCells.length === 0) return;
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.innerText = 'O';
        const winner = checkWinner();
        if (winner) {
            winnerText.innerText = `${winner} wins!`;
            return;
        }
        currentPlayer = 'X';
        updateTurnIndicator();
    };

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.innerText && !winnerText.innerText) {
                cell.innerText = currentPlayer;
                const winner = checkWinner();
                if (winner) {
                    winnerText.innerText = `${winner} wins!`;
                } else {
                    if (currentPlayer === 'X') {
                        currentPlayer = 'O';
                        if (aiMode) {
                            aiMove();
                        } else {
                            updateTurnIndicator();
                        }
                    } else {
                        currentPlayer = 'X';
                        updateTurnIndicator();
                    }
                }
            }
        });
    });

    aiModeButton.addEventListener('click', () => {
        aiMode = true;
        mainMenu.style.display = 'none';
        gameSection.style.display = 'block';
        resetBoard();
    });

    twoPlayerModeButton.addEventListener('click', () => {
        aiMode = false;
        mainMenu.style.display = 'none';
        gameSection.style.display = 'block';
        resetBoard();
    });

    restartButton.addEventListener('click', resetBoard);

    updateTurnIndicator();
});
