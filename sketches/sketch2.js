// Sketch 2 - Letter Typography Explorer
// Click to place letters with random fonts, styles, sizes, and Mondrian colors

function initializeSketch2() {
    // Clear any existing letters
    letters = [];
    console.log("Sketch 2 initialized: Letter Typography Explorer");
}

function clickLetterTypography() {
    let x = mouseX;
    let y = mouseY;
    let letter = getRandomLetter();
    let font = getRandomFont();
    let style = getRandomStyle();
    let size = getRandomSize();
    let color = random(MONDRIAN_COLORS);
    let newLetter = new Letter(x, y, letter, font, style, size, color);
    letters.push(newLetter);
}

function drawLetterTypography() {
    for (let i = 0; i < letters.length; i++) {
        letters[i].display();
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

class Letter {
    constructor(x, y, letter, font, style, size, color) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.font = font;
        this.style = style;
        this.size = size;
        this.color = color;
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
}

function redrawLetterTypography() {
    for (let i = 0; i < letters.length; i++) {
        letters[i].display();
    }
} 