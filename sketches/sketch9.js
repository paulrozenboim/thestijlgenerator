// Variables to track mouse velocity
let prevMouseX = 0;
let prevMouseY = 0;
let mouseVelocity = 0;

function initializeSketch9() {
    shapes = [];
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseVelocity = 0;
    console.log("Sketch 9 initialized: Shape Trails with Rotation");
}

function createShapeTrail() {
    // Calculate mouse velocity
    let currentVelX = mouseX - prevMouseX;
    let currentVelY = mouseY - prevMouseY;
    mouseVelocity = sqrt(currentVelX * currentVelX + currentVelY * currentVelY);
    
    // Update previous mouse position
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    
    let shape = {
        x: mouseX,
        y: mouseY,
        color: random(MONDRIAN_COLORS),
        size: random(40, 100),
        created: millis(),
        type: shapes.length % 5,
        rotation: 0, // Current rotation angle
        rotationSpeed: map(mouseVelocity, 0, 50, 0.02, 0.3), // Rotation speed based on drag speed
        direction: random([-1, 1]) // Random clockwise or counterclockwise
        for (let other of shapes) {
            let d = dist(shape.x, shape.y, other.x, other.y);
            if (d < (shape.size + other.size) / 2) {
                let angle = atan2(shape.y - other.y, shape.x - other.x);
                shape.x += cos(angle) * 20;
                shape.y += sin(angle) * 20;
            }
        }
    };
    shapes.push(shape);
}

function drawShapeTrails() {
    background("#FFFFFF"); // clear canvas each frame

    let now = millis();
    for (let i = shapes.length - 1; i >= 0; i--) {
        let s = shapes[i];
        let age = now - s.created;
        let life = 5000; // ms
        let t = 1 - age / life;

        if (t <= 0) {
            shapes.splice(i, 1);
            continue;
        }

        // Update rotation
        s.rotation += s.rotationSpeed * s.direction;

        // 🔥 Pulse effect
        let pulse = sin((age / 200) * TWO_PI) * 0.2 + 1; 
        let currentSize = s.size * t * pulse;

        push();
        translate(s.x, s.y);
        rotate(s.rotation);

        fill(s.color);
        stroke("#000000");
        strokeWeight(2);

        switch (s.type) {
            case 0:
                rectMode(CENTER);
                rect(0, 0, currentSize, currentSize);
                break;
            case 1:
                ellipse(0, 0, currentSize, currentSize);
                stroke("#000000");
                strokeWeight(3);
                line(0, 0, currentSize / 3, 0);
                break;
            case 2:
                triangle(
                    0, -currentSize / 2,
                    -currentSize / 2, currentSize / 2,
                    currentSize / 2, currentSize / 2
                );
                break;
            case 3:
                beginShape();
                for (let j = 0; j < 6; j++) {
                    let angle = TWO_PI / 6 * j;
                    vertex(cos(angle) * currentSize / 2, sin(angle) * currentSize / 2);
                }
                endShape(CLOSE);
                break;
            case 4:
                strokeWeight(4);
                line(-currentSize / 2, 0, currentSize / 2, 0);
                strokeWeight(2);
                line(0, -currentSize / 4, 0, currentSize / 4);
                break;
        }

        pop();
    }
}


// Update mouse velocity tracking when not dragging
function mouseMoved() {
    if (currentSketch === 9) {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseVelocity = 0; // Reset velocity when not dragging
    }
}
