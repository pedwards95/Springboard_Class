/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

window.addEventListener('load', onInit);

// global values
let WIDTH;
let HEIGHT;
let filledRows;
let gameOver = false;
let messageBox;
let currPlayer = 1; // active player: 1 or 2
let board;

//starts a new game. ensures global values are initialized.
////great job with a initializer function like this
function newGame() {
	gameOver = false;
	filledRows = 0;
	messageBox.innerText = '';
	////use arrays instead, with map you can't iterate on col, or rows
	board = new Map();
	WIDTH = document.querySelector('#options #boardWidth').value;
	HEIGHT = document.querySelector('#options #boardHeight').value;
	makeBoard(WIDTH, HEIGHT);
	makeHtmlBoard(width, height);
}

//basic initialization logic for new game compatibility.
//didnt want this done on every new game, so put in a separate method
function onInit() {
	document.querySelector('#createButton').addEventListener('click', newGame);
	messageBox = document.querySelector('#messageBox');
	newGame();
}

/** makeBoard: create in-JS board structure:
 *    makes a map that holds coords as key, and if it taken (and by who) as value
 *    after, it initiates the html board creation
 */
function makeBoard(width, height) {
	for (let i = 0; i < width; i++) {
		for (let q = 0; q < height; q++) {
			board.set(`${i}${q}`, '');
		}
	}
	////this shouldn't be inside the makeBoard function
	//makeHtmlBoard(width, height);
}

//helper method for adding rows to a column
//num is how many to add
function addColumns(row, num) {
	const WIDTH = num;
	while (num > 0) {
		const newTableColumn = document.createElement('td');
		newTableColumn.classList.toggle('gameSlot');
		newTableColumn.setAttribute('x', WIDTH - num);
		newTableColumn.setAttribute('y', row.getAttribute('y'));
		row.append(newTableColumn);
		num--;
	}
	return row;
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard(width, height) {
	const myBoard = document.querySelector('#board');
	const myBoardHead = document.createElement('thead');
	const myBoardBody = document.createElement('tbody');
	const myBoardTitle = document.createElement('th');
	myBoardHead.append(myBoardTitle);
	myBoardTitle.innerText = 'Connect Four';
	myBoardTitle.setAttribute('COLSPAN', width);

	myBoard.style.opacity = 1;

	// this part creates the top row, which only needs to be created separately for the unique class tags.
	// put the event listener here too just for clarity purposes
	const myTopRow = document.createElement('tr');
	myTopRow.classList.toggle('column-top');
	myTopRow.addEventListener('click', handleClick);
	myTopRow.addEventListener('hover', function (event) {
		spawnFake(event);
	});
	myTopRow.setAttribute('y', height);
	height--;
	myBoardBody.append(addColumns(myTopRow, width));

	// this creates the rest of the grid
	while (height > 0) {
		const newTableRow = document.createElement('tr');
		newTableRow.setAttribute('y', height - 1);
		myBoardBody.append(addColumns(newTableRow, width));
		height--;
	}

	// clears board and then attaches the elements created above
	myBoard.innerHTML = '';
	myBoard.append(myBoardHead, myBoardBody);
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
	//narrow down the column
	////instead, filter this from the board variable
	const myColumn = Array.from(document.querySelectorAll('.gameSlot2')).filter(
		(val, i, arr) => {
			return val.getAttribute('x') == x;
		}
	);
	//reverse it (so it is going up instead of down) and find the first one that isnt taken
	const myReturn = myColumn.reverse().find((val, i, arr) => {
		return !val.className.includes('filled');
	});

	//if it finds one, mark it and return it
	//also adds to filled counter if whole column is filled
	if (myReturn) {
		myReturn.classList.toggle('filled');
		////this function shouldn't worry about checking for a win condition
		if (Number.parseInt(myReturn.getAttribute('y')) >= HEIGHT) {
			filledRows += 1;
			console.log('filled rows', filledRows);
			if (filledRows >= WIDTH) {
				endGame('The game is a tie!');
				messageBox.innerText = 'Tied game!';
			}
		}
	} else {
		////this function shouldn't worry about returning a message,
		/// it's job is to just find a empty spot
		messageBox.innerText = 'That row is filled!';
	}

	//can return undefined or found open spot
	return myReturn;
}

/** placeInTable: put into internal map table */
function placeInTable(x, y, player) {
	switch (player) {
		case 1:
			////extra complexity , with no real gains, here you could just set a 1/2 value
			board.set(`${x}${y}`, 'x');
			break;
		case 2:
			board.set(`${x}${y}`, 'o');
			break;
	}
	////this should only place in table, not check for a win condition
	// check for win
	checkForWin(x, y, currPlayer);
}

// put into the DOM board
function placeInBoard(x, player) {
	const myNewPiece = document.createElement('div');
	myNewPiece.classList.toggle('piece');
	const mySlot = findSpotForCol(x);
	if (mySlot) {
		mySlot.append(myNewPiece);
		myNewPiece.setAttribute('x', mySlot.getAttribute('x'));
		myNewPiece.setAttribute('y', mySlot.getAttribute('y'));
		animateDrop(myNewPiece);
		switch (player) {
			case 1:
				myNewPiece.style.backgroundColor = 'blue';
				break;
			case 2:
				myNewPiece.style.backgroundColor = 'red';
				break;
		}
		placeInTable(x, mySlot.getAttribute('y'), player);

		// switch players
		if (!gameOver) {
			switch (currPlayer) {
				case 1:
					messageBox.innerText = randomText(2);
					currPlayer = 2;
					break;
				case 2:
					messageBox.innerText = randomText(1);
					currPlayer = 1;
					break;
			}
		}
	}
}

/** endGame: announce game end */
function endGame(msg) {
	//// just gameOver = true and alert message
	gameOver = true;
	alert(msg);
	if (!gameOver) {
		gameOver = true;
		alert(msg);
	} else {
		alert(msg);
	}
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
	if (gameOver) {
		return;
	}
	// get x from ID of clicked cell
	const x = evt.target.getAttribute('x');

	////here should be the function that you manages
	//// and orchestrates all other functions together
	// place piece in board and add to HTML table
	placeInBoard(x, currPlayer);
}

/** checkForWin: check board for "does a win start here?" */
function checkForWin(x, y, player) {
	// player 1 = x  || player 2 = o
	let myPlayer;
	switch (player) {
		case 1:
			myPlayer = 'x';
			break;
		case 2:
			myPlayer = 'o';
			break;
	}
	x = Number.parseInt(x);
	y = Number.parseInt(y);

	//logic for checking which direction player is trying to win
	if (
		board.get(`${x + 1}${y}`) == myPlayer ||
		board.get(`${x - 1}${y}`) == myPlayer
	) {
		checkForWinAdvanced(x, y, myPlayer, 'horizontal');
	}
	if (
		board.get(`${x}${y + 1}`) == myPlayer ||
		board.get(`${x}${y - 1}`) == myPlayer
	) {
		checkForWinAdvanced(x, y, myPlayer, 'vertical');
	}
	if (
		board.get(`${x + 1}${y + 1}`) == myPlayer ||
		board.get(`${x - 1}${y - 1}`) == myPlayer
	) {
		checkForWinAdvanced(x, y, myPlayer, 'diagonalOne');
	}
	if (
		board.get(`${x + 1}${y - 1}`) == myPlayer ||
		board.get(`${x - 1}${y + 1}`) == myPlayer
	) {
		checkForWinAdvanced(x, y, myPlayer, 'diagonalTwo');
	}
}

//logic for actual win
function checkForWinAdvanced(x, y, player, type) {
	let matches = 1;
	switch (type) {
		case 'horizontal':
			if (board.get(`${x + 1}${y}`) == player) {
				matches++;
				if (board.get(`${x + 2}${y}`) == player) {
					matches++;
					if (board.get(`${x + 3}${y}`) == player) {
						matches++;
					}
				}
			}
			if (board.get(`${x - 1}${y}`) == player) {
				matches++;
				if (board.get(`${x - 2}${y}`) == player) {
					matches++;
					if (board.get(`${x - 3}${y}`) == player) {
						matches++;
					}
				}
			}
			break;
		case 'vertical':
			if (board.get(`${x}${y + 1}`) == player) {
				matches++;
				if (board.get(`${x}${y + 2}`) == player) {
					matches++;
					if (board.get(`${x}${y + 3}`) == player) {
						matches++;
					}
				}
			}
			if (board.get(`${x}${y - 1}`) == player) {
				matches++;
				if (board.get(`${x}${y - 2}`) == player) {
					matches++;
					if (board.get(`${x}${y - 3}`) == player) {
						matches++;
					}
				}
			}
			break;
		case 'diagonalOne':
			if (board.get(`${x + 1}${y + 1}`) == player) {
				matches++;
				if (board.get(`${x + 2}${y + 2}`) == player) {
					matches++;
					if (board.get(`${x + 3}${y + 3}`) == player) {
						matches++;
					}
				}
			}
			if (board.get(`${x - 1}${y - 1}`) == player) {
				matches++;
				if (board.get(`${x - 2}${y - 2}`) == player) {
					matches++;
					if (board.get(`${x - 3}${y - 3}`) == player) {
						matches++;
					}
				}
			}
			break;
		case 'diagonalTwo':
			if (board.get(`${x + 1}${y - 1}`) == player) {
				matches++;
				if (board.get(`${x + 2}${y - 2}`) == player) {
					matches++;
					if (board.get(`${x + 3}${y - 3}`) == player) {
						matches++;
					}
				}
			}
			if (board.get(`${x - 1}${y + 1}`) == player) {
				matches++;
				if (board.get(`${x - 2}${y + 2}`) == player) {
					matches++;
					if (board.get(`${x - 3}${y + 3}`) == player) {
						matches++;
					}
				}
			}
			break;
	}
	//if 4 in a row, that player wins
	//timeout on alert so that DOM updates first
	if (matches >= 4) {
		const myBoard = document.querySelector('#board');
		gameOver = true;
		myBoard.style.opacity = 0.2;
		return true;
	}
	return false;
}

//random 'its your turn' quotes for the message box
////great job with the messages and user experience in general
function randomText(player) {
	const quotePool = [
		`Player ${player}, its your turn!`,
		`Player ${player}, its your turn!`,
		`Player ${player}, its your turn!`,
		`Player ${player}, its your turn!`,
		`Player ${player}, its your turn!`,
		`Player ${player}, show them what you got!`,
		`Let's see where Player ${player} wants to go.`,
		`Player ${player}, its time to show your true power!`,
		`I think this next move by Player ${player} will be crucial!`,
		`Player ${player}, what will you do?`,
		`Player ${player}, its prime time!`,
		`Player ${player}, show me your moves!`,
		`Will Player ${player} win here?`,
		`Ok, Player ${player}, its your turn!`,
		`Hey, Player ${player}, its your turn!`,
		`I think its Player ${player}'s turn!`,
		`Time to roll, Player ${player}!`,
		`Player ${player}, do you dare try to stop them?`,
		`Player ${player}, time for some genius plays!`,
		`Player ${player}, where are we dropping?`,
		`Player ${player}, time to drop!`,
		`Player ${player}, here we go!`,
		`Here we go Player ${player}!`,
		`Player ${player}, is it time for the secret move?`,
		`Player ${player}, its your time to shine!`,
		`We have waited for too long, Player ${player}!`,
		`What now, Player ${player}?`,
		`Player ${player}, drop your piece!`,
		`En Taro Adun, Player ${player}!`,
		`For the Swarm, Player ${player}!`,
		`Hail Hydra, Player ${player}!`,
		`Don't hold back, Player ${player}!`,
		`Don't go easy on them, Player ${player}!`,
		`No, Player ${player}, this is our fight!`,
		`Will Player ${player} do something tricky here?`,
	];
	return quotePool[Math.floor(Math.random() * quotePool.length)];
}

function animateDrop(piece) {
	let currHeight = 10;
	piece.style.top = `${currHeight}px`;
	let slowMath1 = Number.parseInt(piece.getAttribute('y'));
	let slowMath2 = HEIGHT - slowMath1;
	let slowMath3 = slowMath2 * 56;
	let finalY;
	if (slowMath3 == 0) {
		finalY = slowMath3 + 64;
	} else {
		finalY = slowMath3 + 8;
	}

	let finalX = Number.parseInt(piece.getAttribute('x')) * 56 - 3;
	piece.style.left = `${finalX}px`;

	let id = setInterval(function () {
		if (currHeight < finalY) {
			currHeight += 2;
			piece.style.top = `${currHeight}px`;
		} else {
			clearInterval(id);
		}
	}, 5);
}

function spawnFake(event) {}
