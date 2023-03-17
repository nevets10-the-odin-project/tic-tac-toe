const game = (() => {
	const _board = [
		{ token: null, element: null, row: 0, col: 0, diag: 0 },
		{ token: null, element: null, row: 0, col: 1, diag: NaN },
		{ token: null, element: null, row: 0, col: 2, diag: 2 },
		{ token: null, element: null, row: 1, col: 0, diag: NaN },
		{ token: null, element: null, row: 1, col: 1, diag: 1 },
		{ token: null, element: null, row: 1, col: 2, diag: NaN },
		{ token: null, element: null, row: 2, col: 0, diag: 2 },
		{ token: null, element: null, row: 2, col: 1, diag: NaN },
		{ token: null, element: null, row: 2, col: 2, diag: 0 },
	];

	const _statusDisplay = document.querySelector(".status-display");
	const _boardSpots = document.querySelectorAll(".board-spot");
	_boardSpots.forEach((spot, index) => {
		_board[index].element = spot;
	});

	const _playerSetupDiv = document.querySelector(".player-setup");
	const _togglePlayerSelect = () => {
		_playerSetupDiv.classList.toggle("hidden");
	};

	let _isPlayer1Turn = true;
	let _player1 = null;
	let _player2 = null;

	const _playerFactory = (newName, isPlayerHuman = true) => {
		const name = newName;
		const isHuman = isPlayerHuman;
		let score = 0;
		return { name, isHuman, score };
	};

	const _checkForWin = (currentToken, slotIndex) => {
		const currentSlot = _board[slotIndex];

		const isRowWin =
			_board
				.filter((slot) => slot.row === currentSlot.row)
				.map((slot) => slot.token)
				.filter((token) => token === currentToken).length === 3;

		const isColWin =
			_board
				.filter((slot) => slot.col === currentSlot.col)
				.map((slot) => slot.token)
				.filter((token) => token === currentToken).length === 3;

		let isDiagonalWin = false;

		if (currentSlot.diag !== NaN) {
			if (currentSlot.diag >= 1) {
				isDiagonalWin =
					_board
						.filter((slot) => slot.diag >= 1)
						.map((slot) => slot.token)
						.filter((token) => token === currentToken).length === 3;
			} else if (currentSlot.diag <= 1) {
				isDiagonalWin =
					_board
						.filter((slot) => slot.diag <= 1)
						.map((slot) => slot.token)
						.filter((token) => token === currentToken).length === 3;
			}
		}

		return isRowWin || isColWin || isDiagonalWin;
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

	const _updateBoard = (currentToken, slotIndex) => {
		if (_board[slotIndex].token !== null) {
			return;
		} else {
			_board[slotIndex].token = currentToken;
		}
	};

	const _updateStatus = (status) => {
		_statusDisplay.textContent = status;
	};

	const _processChoice = (e) => {
		const slotIndex = _board.map((slot) => slot.element).indexOf(e.target);
		const currentToken = _isPlayer1Turn ? "X" : "O";
		_placeToken(currentToken, slotIndex);
		_updateBoard(currentToken, slotIndex);
		if (_checkForWin(currentToken, slotIndex)) {
			_updateStatus(`Player ${_isPlayer1Turn ? "1" : "2"} won!`);
			_endGame();
		} else {
			_updateStatus(`Player ${_isPlayer1Turn ? "2's" : "1's"} turn.`);
		}
		//_board[slotIndex].token = currentToken;
		_isPlayer1Turn = !_isPlayer1Turn;

		return {
			//updatedBoard,
			//hasWon,
		};
	};

	const _placeToken = (currentToken, slotIndex) => {
		const img = document.createElement("img");
		img.setAttribute("alt", currentToken);
		img.setAttribute("src", `./img/${currentToken}.png`);
		_board[slotIndex].element.appendChild(img);
		_board[slotIndex].element.removeEventListener("click", _processChoice);
	};

	const startGame = () => {
		_togglePlayerSelect();
		_reset();
	};

	const _reset = () => {
		_isPlayer1Turn = true;
		_player1 = null;
		_player2 = null;

		_board.forEach((slot) => {
			slot.token = null;
			slot.element.replaceChildren();
			slot.element.addEventListener("click", _processChoice);
		});
	};

	const _resetButton = document.querySelector(".reset");
	_resetButton.addEventListener("click", _reset);

	const _endGame = () => {
		_board.forEach((slot) => {
			slot.element.removeEventListener("click", _processChoice);
		});
	};

	const _howToContinue = () => {
		const howToDiv = document.querySelector(".how-to");
		howToDiv.classList.add("hidden");
		_togglePlayerSelect();
	};

	const _continueBtn = document.querySelector(".continue");
	_continueBtn.addEventListener("click", _howToContinue);

	const _playBtn = document.getElementById("start_game");
	_playBtn.addEventListener("click", startGame);

	return { newPlayer, _board, startGame };
})();

//game.startGame();
