const valueOfNInputElement = document.getElementById("value-of-n");
const startButton = document.getElementById("start-visualization");
const nQueensVisualizerSection = document.getElementById("n-queens-visualizer-section");

var inp_aspeed = document.getElementById("a_speed");

var speed = 180;

inp_aspeed.addEventListener("input", vis_speed);
const queenEmoji = "&#9813;";
/** Number Of Queens and the Size of the Chess Board */
let n = 0;
let column = 0;
/** matrix representing the chess board of size n x n */
let chess = 0;

let animationsArr = new Array();

// event listener for Start Visualization Button
startButton.addEventListener("click", () => {
    if (valueOfNInputElement.value) {
        // disable the Start Visualization Button to prevent multiple clicks
        startButton.setAttribute("disabled", "disabled");
        valueOfNInputElement.setAttribute("disabled", "disabled");

        n = valueOfNInputElement.value;
        column = n;
        nQueensVisualizerSection.innerHTML = "";
        makeChessArr();
        makeTable(n, 1);

        animationsArr = getAnimationsArr(chess, 0); // function that returns an array of animation functions with parameters to visualize the solution algorithm

        animateNQueens(); // function to visualize the solution algorithm
    }
});


function vis_speed() {
    var array_speed = inp_aspeed.value;
    switch (parseInt(array_speed)) {
        case 1: speed = 350;
            break;
        case 2: speed = 210;
            break;
        case 3: speed = 180;
            break;
        case 4: speed = 150;
            break;
        case 5: speed = 70;
            break;
    }

}




function makeChessArr() {
    chess = new Array(n); // add rows

    // add columns
    for (let i = 0; i < n; i++) {
        chess[i] = new Array(n);
    }

    // initialize all values to 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            chess[i][j] = 0;
        }
    }

}


function makeTable(n) {

    const tbl = document.createElement("table");
    tbl.setAttribute("id", "chess-board");


    const tblCaption = document.createElement("caption");
    tblCaption.innerHTML = "Chessboard of size " + n + " x " + n;
    tbl.appendChild(tblCaption);

    // create a <tbody> element
    const tblBody = document.createElement("tbody");

    // create all n rows and n columns of the chess board
    for (let i = 0; i < n; i++) {
        // create a table row
        const row = document.createElement("tr");
        // assign a new id to it
        row.setAttribute("id", "row-" + (i + 1));
        // create n columns in the ith row
        for (let j = 0; j < n; j++) {

            const cell = document.createElement("td");

            cell.setAttribute("id", "row-" + (i + 1) + "-col-" + (j + 1));


            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // add the <tbody> to the <table>
    tbl.appendChild(tblBody);

    // add the <table> to the N Queens Visualizer Section
    nQueensVisualizerSection.appendChild(tbl);

}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time)); // the promise is resolved after the given time
}


async function animateNQueens() {

    for (let functionArr of animationsArr) {
        let animationFunction = functionArr[0];
        let args = functionArr[1];

        await delay(speed); // create a delay to show the animation step-by-step
        animationFunction(...args); // call the function with its respective parameters
    }

    await delay(200); // create a delay after the animation is over

    valueOfNInputElement.removeAttribute("disabled"); // disable the input field to prevent changing of the input value
    startButton.removeAttribute("disabled"); // enable the Start Visualization Button
}


function getAnimationsArr(matrix, row) {


    printNQueens(matrix, row);
    return animationsArr;
}

function printNQueens(chess, row) {

    if (row >= chess.length) {

        return true;
    }


    for (let col = 0; col < chess.length; col++) {

        animationsArr.push([addQueen, [row, col]]);
        if (isQueenSafe(chess, row, col) == true) {

            chess[row][col] = 1;

            animationsArr.push([addQueen, [row, col]]);
            // animationsArr.push([markCurrentSqaureBlue, [row, col]]);
            //animationsArr.push([removeSquareColor, [row, col]]);

            if (printNQueens(chess, row + 1) == true) {
                return true;
            }

            chess[row][col] = 0;
            animationsArr.push([removeQueen, [row, col]]);
        }


    }
    return false;
}

function isQueenSafe(chess, x, y) {

    for (let i = 0; i < x; i++) {
        if (chess[i][y] == 1) {

            animationsArr.push([markCurrentSqaureRed, [i, y]]);
            animationsArr.push([removeSquareColor, [i, y]]);
            //animationsArr.push([markCurrentSqaureBlue, [i, y]]);
            animationsArr.push([removeQueen, [x, y]]);
            return false;
        }
    }

    var row = x;
    var col = y;


    while (row >= 0 && col >= 0) {
        if (chess[row][col] == 1) {
            animationsArr.push([markCurrentSqaureRed, [row, col]]);
            animationsArr.push([removeSquareColor, [row, col]]);
            //animationsArr.push([markCurrentSqaureBlue, [row, col]]);
            animationsArr.push([removeQueen, [x, y]]);
            return false;
        }

        row--;
        col--;
    }

    row = x;
    col = y;


    while (row >= 0 && col < column) {
        if (chess[row][col] == 1) {
            animationsArr.push([markCurrentSqaureRed, [row, col]]);
            animationsArr.push([removeSquareColor, [row, col]]);
            //animationsArr.push([markCurrentSqaureBlue, [row, col]]);
            animationsArr.push([removeQueen, [x, y]]);
            return false;
        }
        row--;
        col++;
    }
    return true;


}


function markCurrentSqaureBlue(row, col) {

    const cell = document.getElementById("row-" + (row + 1) + "-col-" + (col + 1));
    cell.setAttribute("class", "blue-background");

}

function markCurrentSqaureRed(row, col) {

    const cell = document.getElementById("row-" + (row + 1) + "-col-" + (col + 1));
    cell.setAttribute("class", "red-background");
}

function addQueen(row, col) {

    const cell = document.getElementById("row-" + (row + 1) + "-col-" + (col + 1));
    cell.innerHTML = queenEmoji;
    cell.style = "font-size: 50px; ";
}

function removeQueen(row, col) {

    const cell = document.getElementById("row-" + (row + 1) + "-col-" + (col + 1));
    cell.innerHTML = "";

}

function removeSquareColor(row, col) {

    const cell = document.getElementById("row-" + (row + 1) + "-col-" + (col + 1));
    cell.removeAttribute("class")
}

