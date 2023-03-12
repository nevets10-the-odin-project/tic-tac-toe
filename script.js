const gameBoard = (() => {
	const board = {
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

	let isPlayer1 = true;

	const updateBoard = (playerChoice) => {
		if (board[playerChoice] !== null) {
			return "Invalid choice.";
		} else {
			board[playerChoice] = isPlayer1 ? "X" : "O";
			isPlayer1 = !isPlayer1;
			return board;
		}
	};

	return { updateBoard };
})();
