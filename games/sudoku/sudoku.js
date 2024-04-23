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
  alert("Solve button clicked"); // Display a message indicating Solve button was clicked
}

function playClicked() {
  const sudokuSolution = generateSudoku();
  alert(sudokuSolution);
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
  if (row == N - 1 && col == N) {
    return true;
  }
}
