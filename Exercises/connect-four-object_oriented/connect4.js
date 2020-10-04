/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
	constructor(width, height) {
		this.newGame(width, height);
	}
	/** makeBoard: create in-JS board structure:
	 *   board = array of rows, each row is array of cells  (board[y][x])
	 */
	makeBoard() {
		for (let y = 0; y < this.HEIGHT; y++) {
			this.board.push(Array.from({ length: this.WIDTH }));
		}
	}
	/** makeHtmlBoard: make HTML table and row of column tops. */
	makeHtmlBoard(color1 = 'blue', color2 = 'red') {
		const gameSpace = document.getElementById('game');
		const board = document.createElement('table');
		board.setAttribute('id', 'board');

		const myBtn = document.createElement('button');
		myBtn.innerText = 'New Game';
		myBtn.addEventListener(
			'click',
			this.newGame.bind(this, this.WIDTH, this.HEIGHT)
		);

		const myForm = document.createElement('form');
		const playOneColor = document.createElement('input');
		playOneColor.value = color1;
		playOneColor.classList.toggle('playerOneColorSelect');
		const playTwoColor = document.createElement('input');
		playTwoColor.value = color2;
		playTwoColor.classList.toggle('playerTwoColorSelect');
		const playOneColorLabel = document.createElement('label');
		playOneColorLabel.innerText = 'Player 1 Color: ';
		const playTwoColorLabel = document.createElement('label');
		playTwoColorLabel.innerText = 'Player 2 Color: ';
		myForm.append(
			playOneColorLabel,
			playOneColor,
			playTwoColorLabel,
			playTwoColor
		);

		// make column tops (clickable area for adding a piece to that column)
		const top = document.createElement('tr');
		top.setAttribute('id', 'column-top');
		top.addEventListener('click', this.handleClick.bind(this));

		for (let x = 0; x < this.WIDTH; x++) {
			const headCell = document.createElement('td');
			headCell.setAttribute('id', x);
			top.append(headCell);
		}

		board.append(top);

		// make main part of board
		for (let y = 0; y < this.HEIGHT; y++) {
			const row = document.createElement('tr');

			for (let x = 0; x < this.WIDTH; x++) {
				const cell = document.createElement('td');
				cell.setAttribute('id', `${y}-${x}`);
				row.append(cell);
			}

			board.append(row);
		}
		gameSpace.append(this.myGameArea);
		this.myGameArea.append(board, myForm, myBtn);
	}
	/** findSpotForCol: given column x, return top empty y (null if filled) */
	findSpotForCol(x) {
		for (let y = this.HEIGHT - 1; y >= 0; y--) {
			if (!this.board[y][x]) {
				return y;
			}
		}
		return null;
	}
	/** placeInTable: update DOM to place piece into HTML table of board */
	placeInTable(y, x) {
		const piece = document.createElement('div');
		piece.classList.add('piece');
		piece.classList.add(`p${this.currPlayer.getColor()}`);
		piece.style.backgroundColor = this.currPlayer.getColor();
		piece.style.top = -50 * (y + 2);

		const spot = document.getElementById(`${y}-${x}`);
		spot.append(piece);
	}
	/** endGame: announce game end */
	endGame(msg) {
		alert(msg);
	}
	/** handleClick: handle click of column top to play piece */
	handleClick(evt) {
		if (this.gameOver == true) {
			return;
		}
		// get x from ID of clicked cell
		const x = +evt.target.id;

		// get next spot in column (if none, ignore click)
		const y = this.findSpotForCol(x);
		if (y === null) {
			return;
		}

		// place piece in board and add to HTML table
		this.board[y][x] = this.currPlayer.getColor();
		this.placeInTable(y, x);

		// check for win
		if (this.checkForWin()) {
			return this.endGame(`Player ${this.currPlayer.name} won!`);
		}

		// check for tie
		if (this.board.every((row) => row.every((cell) => cell))) {
			return this.endGame('Tie!');
		}

		// switch players
		this.currPlayer =
			this.currPlayer === this.player1 ? this.player2 : this.player1;
	}
	/** checkForWin: check board cell-by-cell for "does a win start here?" */
	checkForWin() {
		const _win = function (cells) {
			// Check four cells to see if they're all color of current player
			//  - cells: list of four (y, x) cells
			//  - returns true if all are legal coordinates & all match currPlayer
			return cells.every(
				([y, x]) =>
					y >= 0 &&
					y < this.HEIGHT &&
					x >= 0 &&
					x < this.WIDTH &&
					this.board[y][x] === this.currPlayer.getColor()
			);
		}.bind(this);

		for (let y = 0; y < this.HEIGHT; y++) {
			for (let x = 0; x < this.WIDTH; x++) {
				// get "check list" of 4 cells (starting here) for each of the different
				// ways to win
				const horiz = [
					[y, x],
					[y, x + 1],
					[y, x + 2],
					[y, x + 3],
				];
				const vert = [
					[y, x],
					[y + 1, x],
					[y + 2, x],
					[y + 3, x],
				];
				const diagDR = [
					[y, x],
					[y + 1, x + 1],
					[y + 2, x + 2],
					[y + 3, x + 3],
				];
				const diagDL = [
					[y, x],
					[y + 1, x - 1],
					[y + 2, x - 2],
					[y + 3, x - 3],
				];
				// find winner (only checking each win-possibility as needed)
				if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
					this.gameOver = true;
					return true;
				}
			}
		}
	}
	newGame(width, height) {
		if (!this.myGameArea) {
			this.myGameArea = document.createElement('div');
		}
		this.gameOver = false;
		this.board = [];
		this.WIDTH = width;
		this.HEIGHT = height;
		let color1;
		let color2;
		try {
			color1 = document.querySelector('.playerOneColorSelect').value;
			color2 = document.querySelector('.playerTwoColorSelect').value;
		} catch {}
		this.myGameArea.innerHTML = '';
		if (color1 && color2) {
			this.player1 = new Player('1', color1);
			this.player2 = new Player('2', color2);
			this.makeHtmlBoard(color1, color2);
		} else {
			this.player1 = new Player('1', 'blue');
			this.player2 = new Player('2', 'red');
			this.makeHtmlBoard();
		}
		this.currPlayer = this.player1;
		this.makeBoard();
	}
}

class Player {
	constructor(name, color) {
		this.name = name;
		this.color = color;
	}
	getColor() {
		return this.color;
	}
}

const gameOne = new Game(7, 6);
