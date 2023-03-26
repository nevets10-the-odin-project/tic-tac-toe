const game = (() => {
	const board = [
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

	const DOMControl = (() => {
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
			_playerNames[0].textContent = player1.name;
			_playerNames[1].textContent = player2.name;
		};

		const placeToken = (tokenImg, slotIndex) => {
			board[slotIndex].element.appendChild(tokenImg.cloneNode());
			board[slotIndex].element.removeEventListener("click", clickHandler);
		};

		const _statusDisplay = document.querySelector(".status-display h2");

		const updateStatus = (status) => {
			_statusDisplay.textContent = status;
		};

		const _player1Score = document.getElementById("p1_score");
		const _player2Score = document.getElementById("p2_score");

		const updateScores = () => {
			_player1Score.textContent = player1.score;
			_player2Score.textContent = player2.score;
		};

		const _togglePlayer2Name = (e) => {
			const player1Radio = document.getElementById("p1_radio");
			const player2Name = document.getElementById("player_two");

			if (player1Radio.checked) {
				player2Name.disabled = true;
			} else {
				player2Name.disabled = false;
			}
		};

		const _playerCountRadios = document.querySelectorAll(
			"input[name='player_count']"
		);

		_playerCountRadios.forEach((radio) => {
			radio.addEventListener("click", _togglePlayer2Name);
		});

		return {
			hide,
			show,
			updatePlayerNames,
			placeToken,
			updateStatus,
			updateScores,
		};
	})();

	const AIChoice = (() => {
		const random = (openSlots) => {
			const randomIndex = Math.floor(Math.random() * openSlots.length);
			const selection = openSlots[randomIndex];
			processChoice(selection.element);
		};

		return { random };
	})();

	const boardSlots = document.querySelectorAll(".board-slot");
	boardSlots.forEach((slot, index) => {
		board[index].element = slot;
	});

	let isPlayer1Turn = true;
	let player1 = null;
	let player2 = null;

	const playerFactory = (token, newName, isHuman = true) => {
		const name = isHuman ? newName : "Computer";
		let score = 0;
		const tokenImg = document.createElement("img");
		tokenImg.setAttribute("alt", token);
		tokenImg.setAttribute("src", `./img/${token}.png`);

		return { name, isHuman, score, token, tokenImg };
	};

	const checkForWin = (currentToken, slotIndex) => {
		const currentSlot = board[slotIndex];

		const isRowWin =
			board
				.filter((slot) => slot.row === currentSlot.row)
				.map((slot) => slot.token)
				.filter((token) => token === currentToken).length === 3;

		const isColWin =
			board
				.filter((slot) => slot.col === currentSlot.col)
				.map((slot) => slot.token)
				.filter((token) => token === currentToken).length === 3;

		let isDiagonalWin = false;

		if (currentSlot.diag !== NaN) {
			if (currentSlot.diag >= 1) {
				isDiagonalWin =
					board
						.filter((slot) => slot.diag >= 1)
						.map((slot) => slot.token)
						.filter((token) => token === currentToken).length === 3;
			} else if (currentSlot.diag <= 1) {
				isDiagonalWin =
					board
						.filter((slot) => slot.diag <= 1)
						.map((slot) => slot.token)
						.filter((token) => token === currentToken).length === 3;
			}
		}

		return isRowWin || isColWin || isDiagonalWin;
	};

	const setPlayers = (playerForm) => {
		player1 = playerFactory("X", playerForm.player_one.value);

		if (playerForm.player_count.value === "1") {
			player2 = playerFactory("O", playerForm.player_two.value, false);
		} else {
			player2 = playerFactory("O", playerForm.player_two.value);
		}
	};

	const updateBoard = (currentToken, slotIndex) => {
		if (board[slotIndex].token === null) {
			board[slotIndex].token = currentToken;
		}
	};

	const processChoice = (clickedElement) => {
		const slotIndex = board.map((slot) => slot.element).indexOf(clickedElement);

		const currentPlayer = isPlayer1Turn ? player1 : player2;
		const otherPlayer = isPlayer1Turn ? player2 : player1;
		isPlayer1Turn = !isPlayer1Turn;

		DOMControl.placeToken(currentPlayer.tokenImg, slotIndex);

		updateBoard(currentPlayer.token, slotIndex);
		const openSlots = board.filter((slot) => slot.token === null);

		if (checkForWin(currentPlayer.token, slotIndex)) {
			currentPlayer.score++;
			DOMControl.updateScores();
			DOMControl.updateStatus(`${currentPlayer.name} won!`);
			endGame();
		} else if (openSlots.length <= 0) {
			DOMControl.updateStatus("Tie!");
			endGame();
		} else if (!otherPlayer.isHuman) {
			AIChoice.random(openSlots);
		} else {
			DOMControl.updateStatus(`${otherPlayer.name}'s turn`);
		}
	};

	const clickHandler = (event) => {
		const element = event.target;
		processChoice(element);
	};

	const newRound = () => {
		isPlayer1Turn = true;
		DOMControl.updateStatus(`${player1.name}'s turn`);
		board.forEach((slot) => {
			slot.token = null;
			slot.element.replaceChildren();
			slot.element.addEventListener("click", clickHandler);
		});
	};

	const newRoundBtn = document.querySelector(".new-round");
	newRoundBtn.addEventListener("click", newRound);

	const startGame = (e) => {
		e.preventDefault();
		setPlayers(e.target);
		DOMControl.updatePlayerNames();
		DOMControl.updateScores();
		newRound();
		DOMControl.hide("player-setup");
		DOMControl.show("status-display");
		DOMControl.show("main");
	};

	const reset = () => {
		player1.score = 0;
		player2.score = 0;
		DOMControl.show("player-setup");
		DOMControl.hide("status-display");
		DOMControl.hide("main");
	};

	const resetButton = document.querySelector(".reset");
	resetButton.addEventListener("click", reset);

	const endGame = () => {
		board.forEach((slot) => {
			slot.element.removeEventListener("click", clickHandler);
		});
	};

	const playerSetupForm = document.querySelector(".player-setup");
	playerSetupForm.addEventListener("submit", startGame);
})();
