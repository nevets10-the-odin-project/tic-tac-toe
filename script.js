const gameBoard = (() => {
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

	let _isPlayer1 = true;

	const updateBoard = (playerChoice) => {
		if (_board[playerChoice] !== null) {
			return "Invalid choice.";
		} else {
			_board[playerChoice] = _isPlayer1 ? "X" : "O";
			_isPlayer1 = !_isPlayer1;
			return _board;
		}
	};

	return { updateBoard };
})();
