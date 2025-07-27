// Sketch 6 - Kinetic Letter Playground
// Drag to create bouncing, spinning letters with physics

let kineticFonts = ["Arial", "Helvetica", "Verdana", "Tahoma", "Trebuchet MS", "Gill Sans", "Arial Black", "Impact"];

function initializeSketch6() {
    // Clear kinetic letters
    lettersList = [];
    console.log("Sketch 6 initialized: Zero Gravity Type");
}

function createKineticLetter() {
    let letter = {
        char: random("abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()".split("")),
        x: mouseX,
        y: mouseY,
        vx: random(-5, 5),
        vy: random(-5, 5),
        rotation: 0,
        rotSpeed: random(-0.2, 0.2),
        color: random(MONDRIAN_COLORS),
        size: random(32, 100),
        font: random(kineticFonts)
    };
    lettersList.push(letter);
}

function drawKineticLetters() {
    background("#FFFFFF");
    for (let i = lettersList.length - 1; i >= 0; i--) {
        let letter = lettersList[i];
        
        // Update position
        letter.x += letter.vx;
        letter.y += letter.vy;
        letter.rotation += letter.rotSpeed;
        
        // Bounce off edges
        if (letter.x < 0 || letter.x > width) letter.vx *= -0.8;
        if (letter.y < 0 || letter.y > height) letter.vy *= -0.8;
        
        // Draw letter
        push();
        translate(letter.x, letter.y);
        rotate(letter.rotation);
        fill(letter.color);
        stroke("#000000");
        strokeWeight(2);
        textSize(letter.size);
        textFont(letter.font); // Make sure to set the font
        textAlign(CENTER, CENTER);
        text(letter.char, 0, 0);
        pop();
    }
} 