// Sketch 5 - Dynamic Pattern Rectangles
// Drag to create textured rectangles with varied dot and line patterns

let gridSize = 50;
let gridCols = 18; // Number of grid columns
let gridRows = 12; // Number of grid rows

function initializeSketch5() {
    // Calculate grid size based on canvas dimensions
    gridSize = min(width / gridCols, height / gridRows);
    
    // Adjust grid size to ensure it fits evenly
    gridCols = floor(width / gridSize);
    gridRows = floor(height / gridSize);
    
    // Recalculate for perfect fit
    gridSize = min(width / gridCols, height / gridRows);
    
    console.log(`Grid: ${gridCols}x${gridRows}, cell size: ${gridSize}`);
    
    // Reset pattern rectangles and drawing state
    shapes = [];
    isDrawing = false;
    startX = 0;
    startY = 0;
    console.log("Sketch 5 initialized: Dynamic Pattern Rectangles");
}

function startPatternRect() {
    startX = snapToGrid(mouseX);
    startY = snapToGrid(mouseY);
    isDrawing = true;
}

function createPatternRect() {
    if (!isDrawing) return;
    
    // Calculate rectangle dimensions with grid snapping
    let endX = snapToGrid(mouseX);
    let endY = snapToGrid(mouseY);
    
    let rectX = min(startX, endX);
    let rectY = min(startY, endY);
    let rectW = abs(endX - startX);
    let rectH = abs(endY - startY);
    
    // Minimum size to avoid tiny rectangles
    if (rectW < gridSize || rectH < gridSize) {
        isDrawing = false;
        return;
    }
    
    // Filter out black from Mondrian colors for rectangle backgrounds
    let colorsWithoutBlack = MONDRIAN_COLORS.filter(c => c !== "#000000");
    let color = random(colorsWithoutBlack);
    let pattern = floor(random(11)); // 11 different patterns
    
    // Store rectangle for redrawing
    shapes.push({
        x: rectX,
        y: rectY,
        width: rectW,
        height: rectH,
        color: color,
        pattern: pattern,
        type: 'patterned_rect'
    });
    
    drawPatternedRect(rectX, rectY, rectW, rectH, color, pattern);
    isDrawing = false;
}

function snapToGrid(value) {
    return floor(value / gridSize) * gridSize;
}

function drawDragPreview() {
    // Only draw preview when actually dragging
    if (!isDrawing) return;
    
    let endX = snapToGrid(mouseX);
    let endY = snapToGrid(mouseY);
    
    let rectX = min(startX, endX);
    let rectY = min(startY, endY);
    let rectW = abs(endX - startX);
    let rectH = abs(endY - startY);
    
    // Draw preview outline only (no fill)
    noFill();
    stroke("#000000");
    strokeWeight(2);
    rect(rectX, rectY, rectW, rectH);
    
    // Add corner markers for better visual feedback
    fill("#000000");
    noStroke();
    let cornerSize = 3;
    
    // Top-left corner
    rect(rectX - cornerSize/2, rectY - cornerSize/2, cornerSize, cornerSize);
    // Top-right corner  
    rect(rectX + rectW - cornerSize/2, rectY - cornerSize/2, cornerSize, cornerSize);
    // Bottom-left corner
    rect(rectX - cornerSize/2, rectY + rectH - cornerSize/2, cornerSize, cornerSize);
    // Bottom-right corner
    rect(rectX + rectW - cornerSize/2, rectY + rectH - cornerSize/2, cornerSize, cornerSize);
}

// Optional: Draw grid lines to see the snap points (for debugging)
function drawGridLines() {
    stroke("#CCCCCC");
    strokeWeight(0.5);
    
    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
        line(x, 0, x, height);
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
        line(0, y, width, y);
    }
}

function drawPatternedRect(x, y, w, h, color, pattern) {
    // Draw base rectangle
    fill(color);
    stroke("#000000");
    strokeWeight(2);
    rect(x, y, w, h);
    
    // Add pattern overlay
    drawPattern(x, y, w, h, pattern);
}

function drawPattern(x, y, w, h, pattern) {
    push();
    
    switch(pattern) {
        case 0: // Small dots
            fill("#000000");
            noStroke();
            // Calculate even spacing based on rectangle size
            let dotSpacingX = w / (floor(w / 12) || 1);
            let dotSpacingY = h / (floor(h / 16) || 1);
            let dotStartX = x + dotSpacingX / 2;
            let dotStartY = y + dotSpacingY / 2;
            
            for (let i = dotStartX; i < x + w; i += dotSpacingX) {
                for (let j = dotStartY; j < y + h; j += dotSpacingY) {
                    ellipse(i, j, 4, 4);
                }
            }
            break;
            
        case 1: // Colorful circles
            noStroke();
            let circleColors = ["#FEB400", "#155498", "#018C34", "#D5311F", "#FFFFFF"];
            let circleSpacingX = w / (floor(w / 15) || 1);
            let circleSpacingY = h / (floor(h / 15) || 1);
            let circleStartX = x + circleSpacingX / 2;
            let circleStartY = y + circleSpacingY / 2;
            
            let colorIndex = 0;
            for (let i = circleStartX; i < x + w; i += circleSpacingX) {
                for (let j = circleStartY; j < y + h; j += circleSpacingY) {
                    fill(circleColors[colorIndex % circleColors.length]);
                    ellipse(i, j, 8, 8);
                    colorIndex++;
                }
            }
            break;
            
        case 2: // Vertical lines
            stroke("#000000");
            strokeWeight(1);
            // Calculate number of lines that fit, then space evenly
            let vLineCount = floor(w / 12) || 1;
            let vLineSpacing = w / (vLineCount + 1);
            
            for (let i = 1; i <= vLineCount; i++) {
                let lineX = x + i * vLineSpacing;
                line(lineX, y + 2, lineX, y + h - 2); // Leave small margin from edges
            }
            break;
            
        case 3: // Horizontal lines
            stroke("#000000");
            strokeWeight(1);
            let hLineCount = floor(h / 12) || 1;
            let hLineSpacing = h / (hLineCount + 1);
            
            for (let i = 1; i <= hLineCount; i++) {
                let lineY = y + i * hLineSpacing;
                line(x + 2, lineY, x + w - 2, lineY); // Leave small margin from edges
            }
            break;
            
        case 4: // Diagonal lines (\)
            stroke("#000000");
            strokeWeight(1);
            // Calculate diagonal spacing based on rectangle diagonal
            let diagonalSpacing = min(w, h) / 6;
            
            for (let offset = -h; offset < w; offset += diagonalSpacing) {
                let startX = max(x + 2, x + offset);
                let startY = max(y + 2, y + (startX - x - offset));
                let endX = min(x + w - 2, x + offset + h);
                let endY = min(y + h - 2, y + (endX - x - offset));
                
                if (startX < endX && startY < endY) {
                    line(startX, startY, endX, endY);
                }
            }
            break;
            
        case 5: // Diagonal lines (/)
            stroke("#000000");
            strokeWeight(1);
            let diagonalSpacing2 = min(w, h) / 6;
            
            for (let offset = 0; offset < w + h; offset += diagonalSpacing2) {
                let startX = max(x + 2, x + offset - h);
                let startY = min(y + h - 2, y + h - (startX - x - offset + h));
                let endX = min(x + w - 2, x + offset);
                let endY = max(y + 2, y + h - (endX - x - offset + h));
                
                if (startX < endX && startY > endY) {
                    line(startX, startY, endX, endY);
                }
            }
            break;
            
        case 6: // Cross-hatch
            stroke("#000000");
            strokeWeight(1);
            // Vertical lines
            let crossVCount = floor(w / 15) || 1;
            let crossVSpacing = w / (crossVCount + 1);
            for (let i = 1; i <= crossVCount; i++) {
                let lineX = x + i * crossVSpacing;
                line(lineX, y + 2, lineX, y + h - 2);
            }
            // Horizontal lines  
            let crossHCount = floor(h / 15) || 1;
            let crossHSpacing = h / (crossHCount + 1);
            for (let i = 1; i <= crossHCount; i++) {
                let lineY = y + i * crossHSpacing;
                line(x + 2, lineY, x + w - 2, lineY);
            }
            break;
            
        case 7: // Half circles pattern
            noStroke();
            let arcSpacingX = w / (floor(w / 20) || 1);
            let arcSpacingY = h / (floor(h / 20) || 1);
            let arcStartX = x + arcSpacingX / 2;
            let arcStartY = y + arcSpacingY / 2;
            
            let orientationIndex = 0;
            for (let i = arcStartX; i < x + w; i += arcSpacingX) {
                for (let j = arcStartY; j < y + h; j += arcSpacingY) {
                    let orientation = orientationIndex % 4;
                    fill(MONDRIAN_COLORS[orientation]);
                    
                    let size = min(arcSpacingX, arcSpacingY) * 0.6;
                    switch(orientation) {
                        case 0: arc(i, j, size, size, PI, TWO_PI); break;
                        case 1: arc(i, j, size, size, PI + HALF_PI, HALF_PI); break;
                        case 2: arc(i, j, size, size, 0, PI); break;
                        case 3: arc(i, j, size, size, HALF_PI, PI + HALF_PI); break;
                    }
                    orientationIndex++;
                }
            }
            break;
            
        case 8: // Wavy horizontal lines
            stroke("#000000");
            strokeWeight(1);
            let waveLineCount = floor(h / 15) || 1;
            let waveSpacing = h / (waveLineCount + 1);
            
            for (let lineIndex = 1; lineIndex <= waveLineCount; lineIndex++) {
                let baseY = y + lineIndex * waveSpacing;
                let waveLength = w / 8; // Number of wave cycles
                
                for (let i = x + 2; i < x + w - 3; i += 2) {
                    let waveOffset = sin((i - x) / waveLength * TWO_PI) * 3;
                    let nextWaveOffset = sin((i + 2 - x) / waveLength * TWO_PI) * 3;
                    line(i, baseY + waveOffset, i + 2, baseY + nextWaveOffset);
                }
            }
            break;
            
        case 9: // Brick wall pattern
            stroke("#000000");
            strokeWeight(1);
            // Calculate brick dimensions based on rectangle size
            let brickCount = max(floor(w / 25), 2);
            let brickW = w / brickCount;
            let rowCount = max(floor(h / 15), 2);
            let brickH = h / rowCount;
            
            // Draw horizontal lines (rows)
            for (let row = 0; row <= rowCount; row++) {
                let yPos = y + row * brickH;
                line(x, yPos, x + w, yPos);
            }
            
            // Draw vertical lines (bricks) with alternating offset
            for (let row = 0; row < rowCount; row++) {
                let yPos = y + row * brickH;
                let offset = (row % 2 === 0) ? 0 : brickW / 2;
                
                for (let brickIndex = 0; brickIndex <= brickCount; brickIndex++) {
                    let xPos = x + brickIndex * brickW + offset;
                    if (xPos > x && xPos < x + w) {
                        line(xPos, yPos, xPos, yPos + brickH);
                    }
                }
            }
            break;
            
        case 10: // Concentric rectangles
            noFill();
            stroke("#000000");
            strokeWeight(1);
            let centerX = x + w / 2;
            let centerY = y + h / 2;
            let maxDimension = min(w, h);
            let ringCount = floor(maxDimension / 16) || 1;
            let ringSpacing = maxDimension / (ringCount * 2 + 1);
            
            for (let ring = 1; ring <= ringCount; ring++) {
                let ringSize = ring * ringSpacing * 2;
                let rectWidth = min(ringSize * (w / h), w - 4);
                let rectHeight = min(ringSize, h - 4);
                rect(centerX - rectWidth/2, centerY - rectHeight/2, rectWidth, rectHeight);
            }
            break;
    }
    pop();
}

function redrawPatternGrid() {
    // Optional: Show grid lines (uncomment for debugging)
    // drawGridLines();
    
    // Redraw all existing rectangles (for resize events)
    shapes.forEach(shape => {
        if (shape.type === 'patterned_rect') {
            drawPatternedRect(shape.x, shape.y, shape.width, shape.height, shape.color, shape.pattern);
        }
    });
} 