const ChessBoard = document.getElementById("ChessBoard");
const ChessState = {
    cols: ["h","g","f","e","d","c","b","a"], rows: ["1","2","3","4","5","6","7","8"]
}
let color = 0;let coord = 0;
let firstPos = secondPos = null; // store first & second clicked coordinates

// Create a 2D array
const ChessArray = ChessState.rows.map(row => ChessState.cols.map(col => undefined));

// Place pieces on the board
for (let i = 0 ; i < 8; i++){
    ChessArray[1][i] = "Black Pawn";
    ChessArray[6][i] = "White Pawn";
}

ChessArray[0][0] = ChessArray[0][7] = "Black Rook";
ChessArray[7][0] = ChessArray[7][7] = "White Rook";

ChessArray[0][1] = ChessArray[0][6] = "Black Knight";
ChessArray[7][1] = ChessArray[7][6] = "White Knight";

ChessArray[0][2] = ChessArray[0][5] = "Black Bishop";
ChessArray[7][2] = ChessArray[7][5] = "White Bishop";

ChessArray[0][3] = "Black Queen";
ChessArray[0][4] = "Black King";
ChessArray[7][3] = "White Queen";
ChessArray[7][4] = "White King";

// Create chessboard buttons
for (let y = 0; y < 8; y++){
    for (let x = 0; x < 8; x++){
        const cell = document.createElement("button");
        cell.classList.add("cell");

        // store chess notation in data attribute
        const notation = `${ChessState.cols[x]}${ChessState.rows[y]}`;
        cell.dataset.notation = notation;

        // set background color
        cell.style.backgroundColor = (color === 0) ? "white" : "rgba(146, 145, 145, 1)";
        color = 1 - color;

        // set piece images
        const piece = ChessArray[y][x];
        if (piece) {
            const img = piece.replace(" ", "_") + ".png";
            cell.style.backgroundImage = `url(ChessPieces/${img})`;
            cell.style.backgroundSize = "cover";
        }

        // clicking a button logs the piece and moves if 2nd click
        cell.addEventListener("click", () => {         

            if (coord === 0){
                firstPos = { row: y, col: x };
                coord = 1;
            } else if (coord === 1){
                secondPos = { row: y, col: x };
                // swap pieces

                if (!ChessArray[firstPos.row][firstPos.col] && !ChessArray[secondPos.row][secondPos.col]){
                    alert("You need to have a square with a piece in it")
                }

                switchPositions(firstPos.row, firstPos.col, secondPos.row, secondPos.col);

                // reset
                coord = 0;
                firstPos = null;
                secondPos = null;
            }
        });

        ChessBoard.appendChild(cell);
    }

    // flip color at the end of each row
    color = color ? 0 : 1;
}

// swap pieces in array + update board visuals
function switchPositions(r1, c1, r2, c2) {
    // swap array items
    const temp = ChessArray[r1][c1];
    ChessArray[r1][c1] = ChessArray[r2][c2];
    ChessArray[r2][c2] = temp;

    // get DOM cells to find the cell no.
    const cell1 = ChessBoard.children[r1 * 8 + c1];
    const cell2 = ChessBoard.children[r2 * 8 + c2];

    // update visuals
    updateCellVisual(cell1, ChessArray[r1][c1]);
    updateCellVisual(cell2, ChessArray[r2][c2]);
}

// update a single cell visual based on piece
function updateCellVisual(cell, piece) {
    if (!piece) {
        cell.style.backgroundImage = "";
        return;
    }
    const img = piece.replace(" ", "_") + ".png";
    cell.style.backgroundImage = `url(ChessPieces/${img})`;
    cell.style.backgroundSize = "cover";
}
