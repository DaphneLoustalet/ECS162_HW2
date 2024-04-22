document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const bestDisplay = document.getElementById('best')
    const resultDisplay = document.getElementById('game-result')
    const width = 4
    let squares = []
    let score = 0
    let best = 0;


    //create a board
    function createBoard() {
        resultDisplay.style.display = "none"
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()

    document.getElementById('new-button').onclick = restart;
    document.getElementById('new-button-game-over').onclick = restart;



    document.addEventListener('keyup', control)

    function generate() {
        if (containsZero(squares)) {
            let randomnumber = Math.floor(Math.random() * squares.length)
            if (squares[randomnumber].innerHTML == 0) {
                squares[randomnumber].innerHTML = 2
            } else {
                generate()
            }
        }
        addColours()
        checkResult()
    }

    function restart() {
        score = 0
        scoreDisplay.innerHTML = score
        for (let i = 0; i < width * width; i++) {
            squares[i].innerHTML = 0
        }
        generate()
        generate()
        resultDisplay.style.display = "none"
    }

    function containsZero(a) {
        var i = width * width;
        while (i--) {
            if (a[i].innerHTML === '0') {
                return true;
            }
        }
        return false;
    }

    function swipeRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]

            }
        }
    }

    function swipeLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)

                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function swipeUp() {
        for (let i = 0; i < width; i++) {

            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + 4].innerHTML
            let totalThree = squares[i + 8].innerHTML
            let totalFour = squares[i + 12].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)

            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + 4].innerHTML = newColumn[1]
            squares[i + 8].innerHTML = newColumn[2]
            squares[i + 12].innerHTML = newColumn[3]
        }
    }

    function swipeDown() {
        for (let i = 0; i < width; i++) {

            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + 4].innerHTML
            let totalThree = squares[i + 8].innerHTML
            let totalFour = squares[i + 12].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)

            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + 4].innerHTML = newColumn[1]
            squares[i + 8].innerHTML = newColumn[2]
            squares[i + 12].innerHTML = newColumn[3]
        }
    }

    function addNumbersInRow() {
        for (let i = 0; i < width * width - 1; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i + 1].innerHTML = total
                squares[i].innerHTML = 0
                score += total
                scoreDisplay.innerHTML = score
                if (score > best) {
                    best = score
                    bestDisplay.innerHTML = best
                }
            }
        }
    }

    function addNumbersInColumn() {
        for (let i = 0; i < width * width - 4; i++) {
            if (squares[i].innerHTML === squares[i + 4].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML)
                squares[i + 4].innerHTML = total
                squares[i].innerHTML = 0
                score += total
                scoreDisplay.innerHTML = score
                if (score > best) {
                    best = score
                    bestDisplay.innerHTML = best
                }
            }
        }
    }

    window.addEventListener("keydown", function (e) {
        // prevent scrolling
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
        }
    }, false);


    function control(e) {
        if (e.key === 'ArrowRight') {
            keyRight();
        } else if (e.key === 'ArrowLeft') {
            keyLeft();
        } else if (e.key === 'ArrowUp') {
            keyUp();
        } else if (e.key === 'ArrowDown') {
            keyDown();
        }
    }

    function keyRight() {
        swipeRight()
        addNumbersInRow()
        swipeRight()
        generate()
    }

    function keyLeft() {
        swipeLeft()
        addNumbersInRow()
        swipeLeft()
        generate()
    }

    function keyUp() {
        swipeUp()
        addNumbersInColumn()
        swipeUp()
        generate()
    }

    function keyDown() {
        swipeDown()
        addNumbersInColumn()
        swipeDown()
        generate()
    }

    //add colours
    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#F3F3F3'
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#932432'
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#3C1874'
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#f0697c'
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#325273'
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#52377a'
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#df2b43'
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#db0b27'
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#e05a6c'
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#043f7d'
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#df7583'
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#2e0173'
        }
    }

    function checkResult() {

        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'YOU WIN'
                document.removeEventListener('keyup', control)
            }
        }
        checkForGameOver()

    }

    function checkForGameOver() {
        let zeros = 0
        let isMoveAvailable = false
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
                isMoveAvailable = true
            }
        }

        for (let i = 0; i < width * width - 1; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                isMoveAvailable = true
            }
        }

        for (let i = 0; i < width * width - 4; i++) {
            if (squares[i].innerHTML === squares[i + 4].innerHTML) {
                isMoveAvailable = true
            }
        }

        if (zeros === 0 && isMoveAvailable == false) {
            resultDisplay.style.display = "block";
        }
    }


})