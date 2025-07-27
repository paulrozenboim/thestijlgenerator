// Sketch 1 - Basic Shape Drawing
// Click to draw basic shapes with Mondrian colors and dramatic size variation

function initializeSketch1() {
    // Simple initialization - just ensure clean state
    console.log("Sketch 1 initialized: Basic Shape Drawing");
}

function drawBasicShape() {
    let color = random(MONDRIAN_COLORS);
    fill(color);
    stroke("#000000");
    strokeWeight(2);
    
    // Much more dramatic size variation - from tiny to very large
    let sizeOptions = [
        random(15, 40),   // Small shapes
        random(60, 120),  // Medium shapes  
        random(140, 220), // Large shapes
        random(250, 350)  // Very large shapes
    ];
    let size = random(sizeOptions);
    
    let shapeType = floor(random(4)); // Added one more shape type
    
    switch(shapeType) {
        case 0: // Rectangle
            rect(mouseX - size/2, mouseY - size/2, size, size); 
            break;
        case 1: // Circle
            ellipse(mouseX, mouseY, size, size); 
            break;
        case 2: // Triangle
            triangle(mouseX, mouseY - size/2, 
                    mouseX - size/2, mouseY + size/2, 
                    mouseX + size/2, mouseY + size/2);
            break;
        case 3: // Rectangle with different proportions
            let width = size;
            let height = random(size * 0.3, size * 1.5);
            rect(mouseX - width/2, mouseY - height/2, width, height);
            break;
    }
} 