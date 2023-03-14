const game = (() => {
	const _board = [null, null, null, null, null, null, null, null, null];

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

		let isDiagonal1Win = false;
		let isDiagonal2Win = false;

		if (
			(rowChoice === 0 && colChoice === 0) ||
			(rowChoice === 1 && colChoice === 1) ||
			(rowChoice === 2 && colChoice === 2)
		) {
			isDiagonal1Win =
				[_board[0][0], _board[1][1], _board[2][2]].filter(
					(diag) => diag === currentToken
				).length === 3;
		}

		if (
			(rowChoice === 2 && colChoice === 0) ||
			(rowChoice === 1 && colChoice === 1) ||
			(rowChoice === 0 && colChoice === 2)
		) {
			isDiagonal2Win =
				[_board[2][0], _board[1][1], _board[0][2]].filter(
					(diag) => diag === currentToken
				).length === 3;
		}

		return isRowWin || isColWin || isDiagonal1Win || isDiagonal2Win;
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

	const _updateBoard = (rowChoice, colChoice) => {
		if (_board[rowChoice][colChoice] !== null) {
			return "Invalid choice.";
		} else {
			_board[rowChoice][colChoice] = _isPlayer1Turn ? "X" : "O";
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

	const divs = document.querySelectorAll(".board-spot");
	const array = [];

	function enableBoard() {
		divs.forEach((div) => {
			div.addEventListener("click", _placeToken);
			array.push(div);
		});
	}

	function _placeToken(e) {
		const selection = array.indexOf(e.target);
		const currentToken = _isPlayer1Turn ? "X" : "O";
		const srcImg = _isPlayer1Turn ? "./img/x.png" : "./img/o.png";
		const img = document.createElement("img");
		img.setAttribute("alt", currentToken);
		img.setAttribute("src", srcImg);

		_board[selection] = currentToken;
		e.target.appendChild(img);
		e.target.removeEventListener("click", _placeToken);
		_isPlayer1Turn = !_isPlayer1Turn;
	}

	return { newPlayer, processChoice, enableBoard };
})();

game.enableBoard();
