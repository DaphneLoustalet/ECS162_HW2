/* Play is clicked */

/* 1. Randomly figure out number of spots to show
   2. Generate random valid solution
   3. Refresh page, only showing random spots at selected indices
*/

/* Player pushes arrow keys or space is clicked */

/* 1. Highlight the space
   2. If valid integer is pressed (0 - 9), place it in the square
   3. If all spaces have been filled, change solve button to validate solution
*/

/* Solve Button is clicked */

/* 1. Refresh board showing valid answers
 */

/* Validate Solution is clicked */

/* 1. Iterate through game 2d array check if it is same as solution array
 */

function goToMainMenu() {
  window.location.href = "../../index.html"; // Redirect to the main menu
}

function solveClicked() {
  const array = randomizeSudokuVals();
  alert(array);
}

function playClicked() {
  const sudokuSolution = generateSudoku();
  alert(sudokuSolution);
  /* Place each item in 2D array in its respective container */
  const gridItems = document.querySelectorAll(".grid-item.inner");
  const flatSolution = sudokuSolution.flat();

  let offset;

  /* TODO: Goal is to generate up to 81 in the order I intend */
  for (let i = 0; i < 36; i++) {
    if (i % 9 <= 2) {
      /* First Container in Row */
      if (Math.floor(i / 9) % 3 > 0) {
        offset = (i % 9) + 3 * Math.floor(i / 9);
      } else {
        offset = i;
      }

      gridItems[offset].innerHTML = flatSolution[i] != 0 ? flatSolution[i] : "";
    } else if (i % 9 > 2 && i % 9 <= 5) {
      /* Second Container in Row */
      if (Math.floor(i / 9) % 3 > 0) {
        offset = (i % 9) + 6 + 3 * Math.floor(i / 9);
      } else {
        offset = (i % 9) + 6 + 9 * Math.floor(i / 9);
      }

      gridItems[offset].innerHTML = flatSolution[i] != 0 ? flatSolution[i] : "";
    } else {
      /* Third Container in Row */
      if (Math.floor(i / 9) % 3 > 0) {
        offset = (i % 9) + 12 + 3 * Math.floor(i / 9);
      } else {
        offset = (i % 9) + 12 + 9 * Math.floor(i / 9);
      }
      gridItems[offset].innerHTML = flatSolution[i] != 0 ? flatSolution[i] : "";
    }
  }
}

/* Reference Algorithm: https://www.geeksforgeeks.org/sudoku-backtracking-7/ */
function generateSudoku() {
  let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  if (solveSudoku(grid, 0, 0)) {
    return grid;
  } else {
    return "Play Button clicked";
  }
}

function solveSudoku(grid, row, col) {
  /* Base Case */
  let N = 9;
  if (row === N - 1 && col === N) {
    return true;
  }

  /* If we are in the last column, go to the next row at column 0 */
  if (col === N) {
    row++;
    col = 0;
  }

  /* If position already is filled skip */
  if (grid[row][col] !== 0) {
    return solveSudoku(grid, row, col + 1);
  }

  let scramblednums = randomizeSudokuVals();
  for (let i = 0; i < scramblednums.length; i++) {
    /* Is a number safe to place? */
    if (isSafe(grid, row, col, scramblednums[i])) {
      /* TODO: Randomize number (1 - 9) */
      grid[row][col] = scramblednums[i];
      /* Recursively check the next column */
      if (solveSudoku(grid, row, col + 1)) {
        return true;
      }
    }
    /* If the number is not safe, re-evaluate */
    grid[row][col] = 0;
  }
  return false;
}

/* Randomize numbers 1 - 9 */
function randomizeSudokuVals() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return shuffleArray(numbers);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/* Check validity of Sudoku Solution */
function isSafe(grid, row, col, num) {
  return (
    checkRow(grid, row, num) &&
    checkColumn(grid, col, num) &&
    check3x3(grid, row, col, num)
  );
}

function checkRow(grid, row, num) {
  for (let x = 0; x <= 8; x++) {
    if (grid[row][x] == num) {
      return false;
    }
  }

  return true;
}

function checkColumn(grid, col, num) {
  for (let x = 0; x <= 8; x++) {
    if (grid[x][col] == num) {
      return false;
    }
  }

  return true;
}

function check3x3(grid, row, col, num) {
  let startRow = row - (row % 3),
    startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] == num) {
        return false;
      }
    }
  }

  return true;
}
