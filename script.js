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

	const _DOMControl = (() => {
		const hide = (className) => {
			const element = document.querySelector(`.${className}`);
			element.classList.add("hidden");
		};

		const show = (className) => {
			const element = document.querySelector(`.${className}`);
			element.classList.remove("hidden");
		};

		const _playerNames = document.querySelectorAll(".player h2");

		const updatePlayerNames = () => {
			_playerNames[0].textContent = _player1.name;
			_playerNames[1].textContent = _player2.name;
		};

		const placeToken = (currentToken, slotIndex) => {
			const img = document.createElement("img");
			img.setAttribute("alt", currentToken);
			img.setAttribute("src", `./img/${currentToken}.png`);
			_board[slotIndex].element.appendChild(img);
			_board[slotIndex].element.removeEventListener("click", _processChoice);
		};

		const _statusDisplay = document.querySelector(".status-display");

		const updateStatus = (status) => {
			_statusDisplay.textContent = status;
		};

		return { hide, show, updatePlayerNames, placeToken, updateStatus };
	})();

	const _boardSlots = document.querySelectorAll(".board-slot");
	_boardSlots.forEach((slot, index) => {
		_board[index].element = slot;
	});

	let _isPlayer1Turn = true;
	let _player1 = null;
	let _player2 = null;

	const _playerFactory = (newName, isHuman = true) => {
		const name = newName;
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

	const _setPlayers = (playerForm) => {
		_player1 = _playerFactory(playerForm.player_one.value);

		if (playerForm.player_count.value === "1") {
			_player2 = _playerFactory(playerForm.player_two.value, false);
		} else {
			_player2 = _playerFactory(playerForm.player_two.value);
		}
	};

	const _updateBoard = (currentToken, slotIndex) => {
		if (_board[slotIndex].token !== null) {
			return;
		} else {
			_board[slotIndex].token = currentToken;
		}
	};

	const _processChoice = (e) => {
		const slotIndex = _board.map((slot) => slot.element).indexOf(e.target);
		const currentToken = _isPlayer1Turn ? "X" : "O";
		_DOMControl.placeToken(currentToken, slotIndex);
		_updateBoard(currentToken, slotIndex);
		if (_checkForWin(currentToken, slotIndex)) {
			_DOMControl.updateStatus(
				`${_isPlayer1Turn ? _player1.name : _player2.name} won!`
			);
			_endGame();
		} else {
			_DOMControl.updateStatus(
				`${_isPlayer1Turn ? _player2.name : _player1.name}'s turn.`
			);
		}

		_isPlayer1Turn = !_isPlayer1Turn;
	};

	const _newRound = () => {
		_isPlayer1Turn = true;
		_DOMControl.updateStatus(`${_player1.name}'s turn`);
		_board.forEach((slot) => {
			slot.token = null;
			slot.element.replaceChildren();
			slot.element.addEventListener("click", _processChoice);
		});
	};

	const _newRoundBtn = document.querySelector(".new-round");
	_newRoundBtn.addEventListener("click", _newRound);

	const _startGame = (e) => {
		e.preventDefault();
		_setPlayers(e.target);
		_DOMControl.updatePlayerNames();
		_newRound();
		_DOMControl.hide("player-setup");
		_DOMControl.show("status-display");
		_DOMControl.show("main");
	};

	const _reset = () => {
		_DOMControl.show("player-setup");
		_DOMControl.hide("status-display");
		_DOMControl.hide("main");
	};

	const _resetButton = document.querySelector(".reset");
	_resetButton.addEventListener("click", _reset);

	const _endGame = () => {
		_board.forEach((slot) => {
			slot.element.removeEventListener("click", _processChoice);
		});
	};

	const _howToContinue = () => {
		_DOMControl.hide("how-to");
		_DOMControl.show("player-setup");
	};

	const _continueBtn = document.querySelector(".continue");
	_continueBtn.addEventListener("click", _howToContinue);

	const _playerSetupForm = document.querySelector(".player-setup");
	_playerSetupForm.addEventListener("submit", _startGame);
})();
