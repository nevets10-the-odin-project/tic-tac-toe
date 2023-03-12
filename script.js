const game = (() => {
	const _board = {
		a1: null,
		a2: null,
		a3: null,
		b1: null,
		b2: null,
		b3: null,
		c1: null,
		c2: null,
		c3: null,
	};

	let _isPlayer1Turn = true;
	let _player1;
	let _player2;

	const _playerFactory = (newName, isPlayerHuman = true) => {
		const name = newName;
		const isHuman = isPlayerHuman;
		let score = 0;
		return { name, isHuman, score };
	};

	const _checkForWin = (rowChoice, colChoice) => {
		const currentToken = _isPlayer1Turn ? "X" : "O";

		const isRowWin =
			_board[rowChoice].filter((row) => row === currentToken).length === 3;

		const isColWin =
			_board.map((row) => row[colChoice]).filter((col) => col === currentToken)
				.length === 3;

		if (
			(rowChoice === 0 && colChoice === 0) ||
			(rowChoice === 1 && colChoice === 1) ||
			(rowChoice === 2 && colChoice === 2)
		) {
			const isDiagonal1Win =
				[_board[0][0], _board[1][1], _board[2][2]].filter(
					(diag) => diag === currentToken
				).length === 3;
		}

		if (
			(rowChoice === 2 && colChoice === 0) ||
			(rowChoice === 1 && colChoice === 1) ||
			(rowChoice === 0 && colChoice === 2)
		) {
			const isDiagonal2Win =
				[_board[2][0], _board[1][1], _board[0][2]].filter(
					(diag) => diag === currentToken
				).length === 3;
		}

		return isRowWin || isColWin || isDiagonal1Win || isDiagonal2Win
			? true
			: false;
	};

	const newPlayer = (playerName) => {
		if (_player1 === undefined) {
			_player1 = _playerFactory(playerName);
			return `${playerName} is player 1.`;
		} else if (_player2 === undefined) {
			_player2 = _playerFactory(playerName);
			return `${playerName} is player 2.`;
		} else {
			return "Players already set.";
		}
	};

	const updateBoard = (playerChoice) => {
		if (_board[playerChoice] !== null) {
			return "Invalid choice.";
		} else {
			_board[playerChoice] = _isPlayer1Turn ? "X" : "O";
			_isPlayer1Turn = !_isPlayer1Turn;
			return _board;
		}
	};

	return { newPlayer, updateBoard };
})();
