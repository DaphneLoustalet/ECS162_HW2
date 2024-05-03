const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const play = document.getElementById('play');
const winningMessage = document.getElementById('winMsg');
const freeSpot = document.getElementById('free');
const BINGO_LETTERS = "BINGO";

let bingoNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
let bingoInterval;

const winConditions = [
	// Rows
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],
	// Columns
	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24],
	// Diagonals
	[0, 6, 12, 18, 24],
	[4, 8, 12, 16, 20]
];

function startGame() {
	freeSpot.classList.add("called");
	cellClicker();
	fillCard();
	bingoNumbers = bingoWheel(bingoNumbers);
	bingoInterval = setInterval(drawNumber, 5000);
	play.classList.add("blocked");
}

function playAgain() {
	winningMessage.classList.remove("show");
	clearBingoBoard();
}

function clearBingoBoard() {
	clearDrawnBalls();
	clearBingoCells();
}

function clearDrawnBalls() {
	for (const letter of BINGO_LETTERS) {
		document.getElementById(letter).textContent = "";
	}
}

function clearBingoCells() {
	cellElements.forEach(cell => {
		cell.classList.remove("marked", "called");
		cell.textContent = "";
	});
}

function cellClicker() {
	cellElements.forEach(cell => {
		cell.addEventListener("click", selectTile, { once: true });
	});
}

function selectTile(e) {
	const cell = e.target;

	if (cell.classList.contains("called")) {
		placeIcon(cell, "marked");
	}
}

function placeIcon(cell, markedClass) {
	cell.classList.add(markedClass);
}

function fillCard() {
	const ranges = [
		{ min: 1, max: 15 },
		{ min: 16, max: 30 },
		{ min: 31, max: 45 },
		{ min: 46, max: 60 },
		{ min: 61, max: 75 }
	];

	const usedNumbers = [
		new Set(),
		new Set(),
		new Set(),
		new Set(),
		new Set()
	];

	let j = 0;
	for (let i = 0; i < cellElements.length; i++) {
		const cell = cellElements[i];

		if (i == 12) {
			cell.textContent = "FREE";
			continue;
		}

		j = i % 5;

		const { min, max } = ranges[j];
		const usedNumbersSet = usedNumbers[j];

		let randomNumber;
		do {
			randomNumber = getRandNum(min, max);
		} while (usedNumbersSet.has(randomNumber));

		usedNumbersSet.add(randomNumber);
		cell.textContent = randomNumber;
	}
}

function getRandNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fisher-Yates Sorting Algorithm
function bingoWheel(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function drawNumber() {
	if (bingoNumbers.length > 0) {
		const drawnValue = bingoNumbers.shift();
		checkIfCalled(drawnValue);

		const letterPrefix = getLetterPrefix(drawnValue);

		const drawnBall = document.getElementById(letterPrefix);
		drawnBall.textContent = letterPrefix + drawnValue;
	} else {
		clearInterval(bingoInterval);
	}
}

function getLetterPrefix(drawnValue) {
	let letterPrefix = '';
	if (drawnValue <= 15) {
		letterPrefix = 'B';
	} else if (drawnValue > 15 && drawnValue <= 30) {
		letterPrefix = 'I';
	} else if (drawnValue > 30 && drawnValue <= 45) {
		letterPrefix = 'N';
	} else if (drawnValue > 45 && drawnValue <= 60) {
		letterPrefix = 'G';
	} else if (drawnValue > 60 && drawnValue <= 75) {
		letterPrefix = 'O';
	}

	return letterPrefix;
}

function checkIfCalled(drawnNumber) {
	cellElements.forEach(cell => {
		if (cell.textContent == drawnNumber) {
			cell.classList.add("called");
		}
	});
}

function checkWin() {
	return winConditions.some(combs => {
		return combs.every(i => {
			return cellElements[i].classList.contains("marked");
		});
	});
}

function bingo() {
	if (checkWin()) {
		winningMessage.classList.add("show");
		clearInterval(bingoInterval);
	}
}

function goToMainMenu() {
	window.location.href = "../../index.html";
}
