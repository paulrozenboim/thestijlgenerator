// Sketch 3 - Mondrian Collage
// Drag to create grid-snapping rectangles with authentic Mondrian colors

// Add timing control for reduced frequency
let lastRectTime = 0;

function initializeSketch3() {
    // Clear shapes and reset timing
    shapes = [];
    lastRectTime = 0;
    console.log("Sketch 3 initialized: Mondrian Collage");
}

function createMondrianCollage() {
    // Reduce frequency - only create rectangle every 100ms
    let currentTime = millis();
    if (currentTime - lastRectTime < 50) return;
    lastRectTime = currentTime;
    
    let w = random(20, 200);
    let h = random(20, 180);
    
    // Center the rectangle on the mouse position
    let centerX = mouseX - w/2;
    let centerY = mouseY - h/2;
    
    // Optional: snap to grid but keep centered
    let gridX = floor(centerX / 20) * 20;
    let gridY = floor(centerY / 20) * 20;
    
    let color = random(MONDRIAN_COLORS);
    
    // Store shape for redrawing
    shapes.push({
        x: gridX,
        y: gridY,
        width: w,
        height: h,
        color: color,
        type: 'rectangle'
    });
    
    fill(color);
    stroke("#000000");
    strokeWeight(2);
    rect(gridX, gridY, w, h);
}

function redrawMondrianCollage() {
    shapes.forEach(shape => {
        fill(shape.color);
        stroke("#000000");
        strokeWeight(2);
        rect(shape.x, shape.y, shape.width, shape.height);
    });
} 