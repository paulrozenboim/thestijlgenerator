let mondrianGrids = [];
let cellSize = 30;

function initializeSketch10() {
    mondrianGrids = [];
    background("#FFFFFF");
    console.log("Sketch 10 initialized: Mondrian Pixels");
}

function placeLetterMosaic() {
    const cols = int(random(4, 10));
    const rows = int(random(4, 10));
    const startX = mouseX - (cols * cellSize) / 2;
    const startY = mouseY - (rows * cellSize) / 2;

    let grid = [];

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid.push({
                x: startX + i * cellSize,
                y: startY + j * cellSize,
                color: random(MONDRIAN_COLORS)
            });
        }
    }

    mondrianGrids.push(grid);

    grid.forEach(cell => {
        fill(cell.color);
        stroke("#000000");
        strokeWeight(2);
        rect(cell.x, cell.y, cellSize, cellSize);
    });
}

function redrawLetterMosaic() {
    background("#FFFFFF");
    mondrianGrids.forEach(grid => {
        grid.forEach(cell => {
            fill(cell.color);
            stroke("#000000");
            strokeWeight(2);
            rect(cell.x, cell.y, cellSize, cellSize);
        });
    });
}

function mouseWheel(event) {
    cellSize += event.delta > 0 ? -5 : 5;
    cellSize = constrain(cellSize, 10, 100);
    return false; // prevents default scroll
}
