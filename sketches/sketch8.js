// Sketch 8 - Letter Gravity Field (Snappy disappear with echo trail + Mouse Repulsion)
let gravityLetters = [];

function initializeSketch8() {
    gravityLetters = [];
    background("#FFFFFF");
    console.log("Sketch 8 initialized: Letter Gravity Field");
}

// Add a clear function specifically for sketch 8
function clearSketch8() {
    gravityLetters = [];
    background("#FFFFFF");
}

function createGravityLetter() {
    gravityLetters.push({
        char: random("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".split("")),
        x: mouseX,
        y: mouseY,
        vx: random(-4, 4),
        vy: 0,
        color: random(MONDRIAN_COLORS),
        size: random(10, 50),
        font: random(["Georgia", "Impact", "Courier New", "Times", "Arial Black", "Verdana", "Trebuchet MS"]),
        born: millis(),
        lifespan: random(500, 5000)
    });
}

function drawLetterGravity() {
    // Disable echo trail by using normal background clear instead of translucent overlay
    background("#FFFFFF"); // This replaces the echo effect
    
    let now = millis();
    for (let i = gravityLetters.length - 1; i >= 0; i--) {
        let l = gravityLetters[i];

        // Check if letter should be removed
        if (now - l.born > l.lifespan) {
            gravityLetters.splice(i, 1);
            continue;
        }

        // Apply gravity
        l.vy += 0.2;

        // Mouse repulsion force
        let mouseDistance = dist(mouseX, mouseY, l.x, l.y);
        let repelRadius = 120; // Distance at which repulsion starts
        
        if (mouseDistance < repelRadius && mouseDistance > 0) {
            // Calculate repulsion force (stronger when closer)
            let repelStrength = map(mouseDistance, 0, repelRadius, 8, 0); // Max force of 8 when very close
            
            // Calculate direction from mouse to letter
            let repelAngle = atan2(l.y - mouseY, l.x - mouseX);
            
            // Apply repulsion force to velocity
            l.vx += cos(repelAngle) * repelStrength;
            l.vy += sin(repelAngle) * repelStrength;
            
            // Add some visual feedback - make letters bigger when being repelled
            let originalSize = l.size;
            l.size = originalSize + map(repelStrength, 0, 8, 0, 20);
        }

        // Update position
        l.x += l.vx;
        l.y += l.vy;

        // Bounce off ground
        if (l.y > height - l.size / 2) {
            l.y = height - l.size / 2;
            l.vy *= -0.7;
            l.vx *= 0.9; // Friction when bouncing
        }

        // Bounce off walls
        if (l.x < l.size / 2) {
            l.x = l.size / 2;
            l.vx *= -0.5;
        } else if (l.x > width - l.size / 2) {
            l.x = width - l.size / 2;
            l.vx *= -0.5;
        }

        // Bounce off ceiling (optional)
        if (l.y < l.size / 2) {
            l.y = l.size / 2;
            l.vy *= -0.3;
        }

        // Add drag/damping to prevent letters from moving too fast
        l.vx *= 0.98;
        l.vy *= 0.99;

        // Draw the letter
        fill(l.color);
        stroke("#000000");
        strokeWeight(2);
        textSize(l.size);
        textFont(l.font);
        textAlign(CENTER, CENTER);
        text(l.char, l.x, l.y);
    }

    // Optional: Draw mouse repulsion area for visual feedback
    if (gravityLetters.length > 0) {
        noFill();
        stroke(0, 0, 0, 30);
        strokeWeight(0);
        ellipse(mouseX, mouseY, 100, 100); // Show repulsion radius
    }
}
