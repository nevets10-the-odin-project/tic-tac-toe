const game = (() => {
	const _board = [
		{ token: null, element: null, row: 0, col: 0, diag: 0 },
		{ token: null, element: null, row: 0, col: 1, diag: null },
		{ token: null, element: null, row: 0, col: 2, diag: 2 },
		{ token: null, element: null, row: 1, col: 0, diag: null },
		{ token: null, element: null, row: 1, col: 1, diag: 1 },
		{ token: null, element: null, row: 1, col: 2, diag: null },
		{ token: null, element: null, row: 2, col: 0, diag: 2 },
		{ token: null, element: null, row: 2, col: 1, diag: null },
		{ token: null, element: null, row: 2, col: 2, diag: 0 },
	];

	let _isPlayer1Turn = true;
	let _player1 = null;
	let _player2 = null;

	const _playerFactory = (newName, isPlayerHuman = true) => {
		const name = newName;
		const isHuman = isPlayerHuman;
		let score = 0;
		return { name, isHuman, score };
	};

	const _checkForWin = (rowChoice) => {
		const currentToken = _isPlayer1Turn ? "X" : "O";

		let selectedRow = 0;
		let selectedCol = 0;
		let selectedDiag = 0;

		const isRowWin =
			_board[rowChoice].filter((row) => row === currentToken).length === 3;

		const isColWin =
			_board.map((row) => row[colChoice]).filter((col) => col === currentToken)
				.length === 3;

		let isDiagonal1Win = false;
		let isDiagonal2Win = false;

		if (rowChoice === 0 || rowChoice === 1 || rowChoice === 2) {
			isDiagonal1Win =
				[_board[0], _board[1], _board[2]].filter((diag) => diag === currentToken)
					.length === 3;
		}

		if (rowChoice === 2 || rowChoice === 1 || rowChoice === 0) {
			isDiagonal2Win =
				[_board[2], _board[1], _board[0]].filter((diag) => diag === currentToken)
					.length === 3;
		}

		return isRowWin || isColWin || isDiagonal1Win || isDiagonal2Win;
	};

	const newPlayer = (playerName) => {
		if (_player1 === null) {
			_player1 = _playerFactory(playerName);
			return `${playerName} is player 1.`;
		} else if (_player2 === null) {
			_player2 = _playerFactory(playerName);
			return `${playerName} is player 2.`;
		} else {
			return "Players already set.";
		}
	};

	const _updateBoard = (rowChoice) => {
		if (_board[rowChoice] !== null) {
			return "Invalid choice.";
		} else {
			_board[rowChoice] = _isPlayer1Turn ? "X" : "O";
			return _board;
		}
	};

	const processChoice = (rowChoice, colChoice) => {
		const updatedBoard = _updateBoard(rowChoice, colChoice);
		const hasWon = _checkForWin(rowChoice, colChoice);
		_isPlayer1Turn = !_isPlayer1Turn;

		return {
			updatedBoard,
			hasWon,
		};
	};

	const boardSpots = document.querySelectorAll(".board-spot");

	const initializeBoard = () => {
		boardSpots.forEach((spot, index) => {
			_board[index].element = spot;
		});
	};

	const _placeToken = (e) => {
		const selection = _board.map((slot) => slot.element).indexOf(e.target);
		const currentToken = _isPlayer1Turn ? "X" : "O";
		const srcImg = _isPlayer1Turn ? "./img/X.png" : "./img/O.png";
		const img = document.createElement("img");
		img.setAttribute("alt", currentToken);
		img.setAttribute("src", srcImg);

		_board[selection].token = currentToken;
		e.target.appendChild(img);
		e.target.removeEventListener("click", _placeToken);
		_isPlayer1Turn = !_isPlayer1Turn;
	};

	const startGame = () => {
		_reset();
	};

	const _reset = () => {
		_player1 = null;
		_player2 = null;

		_board.forEach((slot) => {
			slot.token = null;
			slot.element.replaceChildren();
			slot.element.addEventListener("click", _placeToken);
		});
	};

	return { newPlayer, processChoice, initializeBoard, _board, startGame };
})();

game.initializeBoard();
game.startGame();

//game._board.filter(slot => slot.row === 0).map(slot => slot.token)
