let mondrianGrids = [];
let cellSize = 30;

// Touch/pinch variables
let initialPinchDistance = 0;
let initialCellSize = 0;
let isPinching = false;

function initializeSketch10() {
    mondrianGrids = [];
    background("#FFFFFF");
    
    // Reset pinch variables
    initialPinchDistance = 0;
    initialCellSize = 0;
    isPinching = false;
    
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

// Touch handling for pinch gestures (only for sketch 10)
function touchStarted() {
    if (currentSketch !== 10) return true; // Let p5.js handle other sketches normally
    
    // Start pinch gesture with two fingers
    if (touches.length === 2) {
        initialPinchDistance = getTouchDistance(touches[0], touches[1]);
        initialCellSize = cellSize;
        isPinching = true;
        return false; // Prevent default touch behavior for pinch
    }
    
    // For single touch, let p5.js handle it normally (will become mouse events)
    return true;
}

function touchMoved() {
    if (currentSketch !== 10) return true; // Let p5.js handle other sketches normally
    
    // Handle pinch gesture
    if (isPinching && touches.length === 2) {
        const currentDistance = getTouchDistance(touches[0], touches[1]);
        const distanceChange = currentDistance - initialPinchDistance;
        
        // Scale the distance change to reasonable cell size adjustments
        const scaleFactor = distanceChange * 0.1;
        cellSize = initialCellSize + scaleFactor;
        cellSize = constrain(cellSize, 10, 100);
        
        // Redraw with new cell size
        redrawLetterMosaic();
        
        return false; // Prevent default touch behavior for pinch
    }
    
    // For single touch or non-pinch, let p5.js handle it normally
    return true;
}

function touchEnded() {
    if (currentSketch !== 10) return true; // Let p5.js handle other sketches normally
    
    // End pinch gesture when we have less than 2 touches
    if (touches.length < 2) {
        isPinching = false;
        initialPinchDistance = 0;
        initialCellSize = 0;
    }
    
    // Always let p5.js handle touch end events
    return true;
}

// Helper function to calculate distance between two touch points
function getTouchDistance(touch1, touch2) {
    const dx = touch1.x - touch2.x;
    const dy = touch1.y - touch2.y;
    return Math.sqrt(dx * dx + dy * dy);
}
