const markedClass = 'marked';
let clickAllowed;
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winMsg');

// Need to wipe board if selected play again
// Need to fix issue when marking adjacent items on the board
// Need to implement bingo caller
// How to play description
// Make pretty
// Maybe get rid of gap between boxes
// Multiple boards?
// REALLY NEED TO FIX THE BOXES ADJUSTING WHEN CLICKED ADJACENT

const winConditions = [
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],
	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 13, 18, 24],
	[0, 6, 12, 18, 24],
	[4, 8, 12, 16, 20]
];

function startGame() {
	fillCard();
	cellElements.forEach(cell => {
		cell.addEventListener('click', selectTile, { once: true });
	})
	board.classList.add("marked");
}

function selectTile(e) {
	const cell = e.target;
	placeIcon(cell, markedClass);
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

	let i = 0;
	for (let index = 0; index < cellElements.length; index++) {
		const cell = cellElements[index];

		if (index == 12) {
			cell.textContent = 'FREE';
			continue;
		}

		i = index % 5;

		const { min, max } = ranges[i];
		const usedNumbersSet = usedNumbers[i];

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

function checkWin() {
	return winConditions.some(combs => {
		return combs.every(i => {
			return cellElements[i].classList.contains('marked');
		})
	})
}

function bingo() {
	if(checkWin()) {
		winningMessage.classList.add('show');
	}
}

function goToMainMenu() {
	window.location.href = "../../index.html";
}