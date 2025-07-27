// Sketch 4 - Magnetic Letter Field
// Drag to create floating letters that are attracted to your mouse

let magnetThreshold = 100; // Set the magnetic effect threshold

function initializeSketch4() {
    // Clear magnetic letters
    letters = [];
    console.log("Sketch 4 initialized: Magnetic Letter Field");
}

function createMagneticLetter() {
    let x = mouseX;
    let y = mouseY;
    let letter = getRandomLetter();
    let font = getRandomFont();
    let style = getRandomStyle();
    let size = getRandomSize();
    let color = random(MONDRIAN_COLORS);
    let newLetter = new MagneticLetter(x, y, letter, font, style, size, color);
    letters.push(newLetter);
}

function drawMagneticLetters() {
    background("#FFFFFF"); // Clear the canvas for every frame
    
    for (let i = 0; i < letters.length; i++) {
        letters[i].display();
        letters[i].float();
        letters[i].attract();
    }
}

function getRandomLetter() {
    let uppercase = floor(random(2)) === 0;
    let letterCode = floor(random(26)) + (uppercase ? 65 : 97);
    return String.fromCharCode(letterCode);
}

function getRandomFont() {
    let fonts = ["Arial", "Helvetica", "Verdana", "Tahoma", "Trebuchet MS", "Gill Sans", "Arial Black", "Impact"];
    let index = floor(random(fonts.length));
    return fonts[index];
}

function getRandomStyle() {
    let styles = [NORMAL, ITALIC, BOLD, BOLDITALIC];
    let index = floor(random(styles.length));
    return styles[index];
}

function getRandomSize() {
    let minSize = 10;
    let maxSize = 150;
    return floor(random(minSize, maxSize));
}

class MagneticLetter {
    constructor(x, y, letter, font, style, size, color) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.font = font;
        this.style = style;
        this.size = size;
        this.color = color;
        this.xoff = random(1000); // For Perlin noise
        this.yoff = random(1000);
    }

    display() {
        fill(this.color);
        stroke("#000000");
        strokeWeight(2);
        textAlign(CENTER, CENTER);
        textSize(this.size);
        textStyle(this.style);
        textFont(this.font);
        text(this.letter, this.x, this.y);
    }

    float() {
        this.x += map(noise(this.xoff), 0, 1, -1, 1);
        this.y += map(noise(this.yoff), 0, 1, -1, 1);
        this.xoff += 0.01;
        this.yoff += 0.01;
    }

    attract() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < magnetThreshold) {
            let force = 2; // Force of attraction
            let angle = atan2(mouseY - this.y, mouseX - this.x);
            this.x += cos(angle) * force;
            this.y += sin(angle) * force;
        }
    }
}

function redrawMagneticLetters() {
    // This sketch continuously redraws in drawMagneticLetters()
    drawMagneticLetters();
} 