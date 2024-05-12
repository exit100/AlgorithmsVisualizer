const valueOfNInputElement = document.getElementById("value-of-n");
const startButton = document.getElementById("start-visualization");
const startPath = document.getElementById("start-path");
const RatInMaze = document.getElementById("n-queens-visualizer-section");


var tbl = 0;

let n = 0;
let column = 0;
let chess = 0;

let animationsArr = new Array();


startButton.addEventListener("click", () => {
    if (valueOfNInputElement.value) {

        startButton.setAttribute("disabled", "disabled");
        valueOfNInputElement.setAttribute("disabled", "disabled");

        n = valueOfNInputElement.value;
        column = n;

        makeChessArr();
        makeTable(n);
        addEventListenersToCells();

    }
});



function makeChessArr() {
    chess = new Array(n);

    for (let i = 0; i < n; i++) {
        chess[i] = new Array(n);
    }


    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            chess[i][j] = 0;
        }
    }

}


function addEventListenersToCells() {
    const chessBoard = document.getElementById("chess-board1");
    const cells = tbl.getElementsByTagName("td");

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", cellClickHandler);
    }
}

function cellClickHandler() {
    const cellId = this.getAttribute("id");
    const [x, row, y, col] = cellId.split("-");
    const rowIndex = parseInt(row);
    const colIndex = parseInt(col);

    this.style.backgroundColor = "red";
    chess[rowIndex][colIndex] = 1;

    this.removeEventListener("click", cellClickHandler); // Deactivate the click listener
}

startPath.addEventListener("click", () => {
    animationsArr = getAnimationsArr(chess, 0, 0);

    const cells = tbl.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", cellClickHandler); // Deactivate all cell click listeners
    }

    animateNQueens();
});


function makeTable(n) {

    tbl = document.createElement("table");
    tbl.setAttribute("id", "chess-board");


    const tblCaption = document.createElement("caption");
    tblCaption.innerHTML = "Chessboard of size " + n + " x " + n;
    tbl.appendChild(tblCaption);


    const tblBody = document.createElement("tbody");


    for (let i = 0; i < n; i++) {

        const row = document.createElement("tr");

        row.setAttribute("id", "row-" + (i));

        for (let j = 0; j < n; j++) {

            const cell = document.createElement("td");

            cell.setAttribute("id", "row-" + (i) + "-col-" + (j));


            row.appendChild(cell);
        }


        tblBody.appendChild(row);
    }


    tbl.appendChild(tblBody);


    RatInMaze.appendChild(tbl);

}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


async function animateNQueens() {

    for (let functionArr of animationsArr) {

        let animationFunction = functionArr[0];

        let args = functionArr[1];

        await delay(350);
        animationFunction(...args);
    }

    await delay(200);

    valueOfNInputElement.removeAttribute("disabled");
    startButton.removeAttribute("disabled");
}


function getAnimationsArr(matrix, row, col) {

    pathFinder(matrix, row, col)



    return animationsArr;
}

function pathFinder(chess, x, y) {


    if (x == column - 1 && y == column - 1 && x >= 0 && y >= 0) {
        chess[x][y] = 0;
        animationsArr.push([markCurrentSqaureBlue, [x, y]]);
        return true;
    }

    if (isSafe(chess, x, y)) {
        chess[x][y] = 0;

        if (pathFinder(chess, x + 1, y)) {
            return true;
        }

        if (pathFinder(chess, x, y + 1)) {
            return true;
        }

        chess[x][y] = 1;
        animationsArr.push([removeSquareColor, [x, y]]);
        return false;
    }

    return false;

}

function isSafe(chess, x, y) {
    if (x >= 0 && y >= 0 && x < column && y < column && chess[x][y] === 0) {
        console.log(x);
        console.log(y);
        animationsArr.push([markCurrentSqaureBlue, [x, y]]);
        return true;
    }
    return false;

}


function markCurrentSqaureBlue(row, col) {
    console.log(row);
    console.log(col);
    const cell = document.getElementById("row-" + (row) + "-col-" + (col));
    cell.setAttribute("class", "blue-background !important");

}


function removeSquareColor(row, col) {

    const cell = document.getElementById("row-" + (row) + "-col-" + (col));
    cell.removeAttribute("class")
}
