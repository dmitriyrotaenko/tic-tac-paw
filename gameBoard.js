import GameController from "./gameController.js";

const GameBoard = () => {
	const controller = GameController();

	const MESSAGES = {
		win: 'The winner is',
		draw: 'It\'s a draw',
		progress: 'Current move'
	}

	const playerToEmoji = {
		0: '🐱',
		1: '🐶'
	}

	const stepElement = document.querySelector('.step');
	let boardElement = renderBoard();
	
	function updateCurrentMoveIcon() {
		stepElement.querySelector('.step-icon').textContent = playerToEmoji[controller.getCurrPlayer()];
	}	

	function renderBoard() {
		const emptyBoard = document.querySelector('.board-template').content.cloneNode(true).querySelector('.board');
		const boardWrapper = document.querySelector('.board-wrapper')
		
		if(boardWrapper.querySelector('.board')) {
			boardWrapper.removeChild(boardWrapper.querySelector('.board'));
		}

		emptyBoard.addEventListener('click', handleCellClick);

		boardWrapper.prepend(emptyBoard);
		
		stepElement.querySelector('.step-text').textContent = MESSAGES.progress;
		updateCurrentMoveIcon();
		return emptyBoard;
	}

	const paintWinningCells = cells => {
		Array.from(boardElement.children).forEach(node => {
			const id = Number(node.dataset?.id);
			if(cells.includes(id)) {
				node.classList.add('winning');
			}
		});
	}

	function handleCellClick({ target }) {
		const cellToUpdate = target.closest('.cell');
		const cellID = Number(cellToUpdate.dataset?.id);
		
		try {
			const currentPlayer = playerToEmoji[controller.getCurrPlayer()];
			const { status, winCombo } = controller.setMove(cellID);
			
			cellToUpdate.textContent = currentPlayer;
			cellToUpdate.classList.add('occupied');

			stepElement.querySelector('.step-text').textContent = MESSAGES[status];

			if(status === 'win') {
				paintWinningCells(winCombo);
				boardElement.classList.add('non-interactive');
			} 
			
			if(status === 'draw') {
				stepElement.querySelector('.step-icon').textContent = '🤝';
				boardElement.classList.add('non-interactive');
			} else {
				updateCurrentMoveIcon();
			}
		} catch({ message }) {
			console.error(message); 
		}
	}

	const handleReset = () => {
		controller.reset();
		boardElement = renderBoard();
	}

	document.querySelector('.reset-btn').addEventListener('click', handleReset);
};

export default GameBoard;