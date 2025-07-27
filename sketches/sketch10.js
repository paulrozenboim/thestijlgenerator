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

// Mouse wheel for desktop
function mouseWheel(event) {
    if (currentSketch === 10 && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        cellSize += event.delta > 0 ? -5 : 5;
        cellSize = constrain(cellSize, 10, 100);
        return false; // prevents default scroll
    }
}

// Touch gesture variables for mobile pinch/zoom
let initialPinchDistance = 0;
let lastPinchDistance = 0;
let isPinching = false;

// Touch start - detect two finger pinch
function touchStarted() {
    if (currentSketch === 10 && touches.length === 2) {
        // Calculate initial distance between two fingers
        let touch1 = touches[0];
        let touch2 = touches[1];
        initialPinchDistance = dist(touch1.x, touch1.y, touch2.x, touch2.y);
        lastPinchDistance = initialPinchDistance;
        isPinching = true;
        
        // Prevent default browser zoom
        return false;
    }
}

// Touch moved - track pinch distance changes
function touchMoved() {
    if (currentSketch === 10 && touches.length === 2 && isPinching) {
        let touch1 = touches[0];
        let touch2 = touches[1];
        let currentPinchDistance = dist(touch1.x, touch1.y, touch2.x, touch2.y);
        
        // Calculate change in distance
        let distanceChange = currentPinchDistance - lastPinchDistance;
        
        // Map distance change to cell size change (similar sensitivity to mouse wheel)
        if (abs(distanceChange) > 2) { // Threshold to avoid jittery changes
            if (distanceChange > 0) {
                // Pinch out (zoom in) - increase cell size
                cellSize += 3;
            } else {
                // Pinch in (zoom out) - decrease cell size
                cellSize -= 3;
            }
            
            cellSize = constrain(cellSize, 10, 100);
            lastPinchDistance = currentPinchDistance;
            
            // Redraw existing grids with new cell size
            redrawLetterMosaic();
        }
        
        // Prevent default browser zoom
        return false;
    }
}

// Touch ended - reset pinch state
function touchEnded() {
    if (currentSketch === 10 && touches.length < 2) {
        isPinching = false;
        initialPinchDistance = 0;
        lastPinchDistance = 0;
    }
}
