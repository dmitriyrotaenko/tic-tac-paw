const GameController = () => {
	let board = Array(9).fill(undefined);
	let currentPlayer = 0; // 0 | 1
	let cellsLeft = board.length;

	const winningCombinations = [
		// horizontal
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		// vertical
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		// diagonal
		[0, 4, 8],
		[2, 4, 6]
	];

	const isWithinBoard = cellIdx => {
		return cellIdx >= 0 && cellIdx <= board.length - 1;
	}

	const checkWin = playerID => {
		return winningCombinations.find(combo => {
			return combo.every(cellIdx => board[cellIdx] === playerID);
		});
	}

	const setMove = cell => {
		if(!isWithinBoard(cell)) {
			throw new RangeError('Cell ID must be between 0 and 8');
		}

		board[cell] = currentPlayer;
		cellsLeft--;
		const winCombo = checkWin(currentPlayer);

		if(Array.isArray(winCombo)) {
			return {
				status: 'win',
				winCombo,
			}
		} else if(cellsLeft === 0) {
			return { status: 'draw' }
		} else {
			currentPlayer = currentPlayer === 0 ? 1 : 0;
			return { status: 'progress' }
		}
	}

	const reset = () => {
		board = board.fill(undefined);
		currentPlayer = 0;
		cellsLeft = board.length;
		return board;
	}

	return {
		getBoard: () => board,
		getCurrPlayer: () => currentPlayer,
		setMove,
		reset
	}
};

export default GameController;