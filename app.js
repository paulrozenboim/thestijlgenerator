// The Style Generator - Single Page Application
// Consolidates all De Stijl sketches into one interactive experience

// Common variables and constants
const MONDRIAN_COLORS = ["#FEB400", "#155498", "#018C34", "#D5311F", "#000000", "#FFFFFF"];
let currentSketch = 1;
let canvas;

// Sketch-specific variables (will be reset when switching sketches)
let letters = [];
let shapes = [];
let shapeX, shapeY;
let shapeType = 0;
let rotationAngle = 0;
let rotationSpeed = 0;
let lettersList = [];
let fonts = ["Arial", "Helvetica", "Verdana", "Times New Roman", "Courier New"];
let gridSize = 20;
let cellSize;
let grid = [];

// Variables for sketch 5 (Pattern Rectangles)
let startX, startY;
let isDrawing = false;

// Sketch descriptions and titles
const sketchData = {
    1: {
        title: "Basic Shape Drawing",
        description: "Click to draw basic shapes with Mondrian colors. Each click creates a new shape at the cursor position."
    },
    2: {
        title: "Letter Typography Explorer", 
        description: "Click to place letters with random fonts, styles, sizes, and Mondrian colors for typographic exploration."
    },
    3: {
        title: "Mondrian Collage",
        description: "Drag to create grid-snapping rectangles with authentic Mondrian colors and proportions."
    },
    4: {
        title: "Magnetic Letter Field",
        description: "Drag to create floating letters that gently drift and are magnetically attracted to your mouse cursor."
    },
    5: {
        title: "Dynamic Pattern Rectangles",
        description: "Drag to create rectangles with varied dot and line patterns - small dots, large dots, stripes, diagonals, cross-hatch, and scattered patterns."
    },
    6: {
        title: "Kinetic Letter Playground",
        description: "Drag to create bouncing, spinning letters in random fonts, sizes, and Mondrian colors with physics."
    },
    7: {
        title: "Generative Color Burst",
        description: "Click to create animated bursts of lines and circles with explosive Mondrian colors."
    },
    8: {
        title: "Letter Gravity Field",
        description: "Drag to create letters that fall, bounce, and roll with gravity physics in Mondrian colors."
    },
    9: {
        title: "Shape Trails",
        description: "Drag to leave a trail of shapes cycling through types and Mondrian colors."
    },
    10: {
        title: "Mondrian Pixels",
        description: "Drag to place Mondrian-colored pixels on a grid to create mosaics. Use scroll wheel to adjust cell size."
    }
};

// p5.js setup function
function setup() {
    console.log("Setup starting...");
    
    // Simple canvas creation
    let canvasWidth = min(window.innerWidth * 0.8, 800);
    let canvasHeight = min(window.innerHeight * 0.6, 600);
    
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvasContainer");
    background("#FFFFFF");
    
    console.log("Canvas created:", canvasWidth, "x", canvasHeight);
    
    // Simple initialization
    cellSize = min(width, height) / gridSize;
    initializeGrid();
    
    // Set up event listeners
    document.getElementById('sketchSelect').addEventListener('change', switchSketch);
    
    // Load first sketch
    loadSketch(1);
    
    console.log("Setup complete");
}

function draw() {
    // Simple draw logic - only for sketches that need continuous drawing
    switch(currentSketch) {
        case 4: 
            if (typeof drawMagneticLetters === 'function') drawMagneticLetters(); 
            break;
        case 6: 
            if (typeof drawKineticLetters === 'function') drawKineticLetters(); 
            break;
        case 8: 
            if (letters.length > 0) {
                background("#FFFFFF");
                if (typeof drawLetterGravity === 'function') drawLetterGravity(); 
            }
            break;
    }
}

// Mouse interaction handlers
function mousePressed() {
    console.log("Mouse pressed, sketch:", currentSketch);
    
    switch(currentSketch) {
        case 1: if (typeof drawBasicShape === 'function') drawBasicShape(); break;
        case 2: if (typeof clickLetterTypography === 'function') clickLetterTypography(); break;
        case 5: if (typeof startPatternRect === 'function') startPatternRect(); break;
        case 7: if (typeof createColorBurst === 'function') createColorBurst(); break;
    }
}

function mouseDragged() {
    switch(currentSketch) {
        case 3: if (typeof createMondrianCollage === 'function') createMondrianCollage(); break;
        case 4: if (typeof createMagneticLetter === 'function') createMagneticLetter(); break;
        case 6: if (typeof createKineticLetter === 'function') createKineticLetter(); break;
        case 8: if (typeof createGravityLetter === 'function') createGravityLetter(); break;
        case 9: if (typeof createShapeTrail === 'function') createShapeTrail(); break;
        case 10: if (typeof placeLetterMosaic === 'function') placeLetterMosaic(); break;
    }
}

function mouseReleased() {
    if (currentSketch === 5 && typeof createPatternRect === 'function') {
        createPatternRect();
    }
}

// Sketch switching functionality
function switchSketch() {
    const newSketch = parseInt(document.getElementById('sketchSelect').value);
    console.log("Switching to sketch:", newSketch);
    loadSketch(newSketch);
}

function loadSketch(sketchNumber) {
    console.log("Loading sketch", sketchNumber);
    currentSketch = sketchNumber;

    // Reset variables
    resetSketchVariables();
    
    // Clear canvas
    background("#FFFFFF");

    // Update UI
    updateSketchInfo(sketchNumber);
    document.getElementById('sketchSelect').value = sketchNumber;

    // Call specific initialization function if available
    const initFunctionName = `initializeSketch${sketchNumber}`;
    if (typeof window[initFunctionName] === 'function') {
        window[initFunctionName]();
        console.log(`Called ${initFunctionName}`);
    } else {
        console.warn(`No function named ${initFunctionName} found`);
    }

    console.log("Sketch", sketchNumber, "loaded");
}

function resetSketchVariables() {
    letters = [];
    shapes = [];
    lettersList = [];
    shapeX = 0;
    shapeY = 0;
    shapeType = 0;
    rotationAngle = 0;
    rotationSpeed = 0;
    startX = 0;
    startY = 0;
    isDrawing = false;
    initializeGrid();
}

function initializeGrid() {
    grid = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = null;
        }
    }
}

// Sketch functions are now loaded from individual files in sketches/ folder



// Utility functions
function updateSketchInfo(sketchNumber) {
    const data = sketchData[sketchNumber];
    document.getElementById('currentTitle').textContent = data.title;
    document.getElementById('currentDescription').textContent = data.description;
}

function clearCanvas() {
    background("#FFFFFF");
    resetSketchVariables();
}

function saveCanvasImage() {
    saveCanvas("de-stijl-sketch-" + currentSketch, "png");
}

function randomizeSketch() {
    const availableSketches = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const randomSketch = random(availableSketches);
    loadSketch(randomSketch);
}

// Handle window resize with aspect ratio preservation
function handleWindowResize() {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function() {
        resizeCanvasProportionally();
    }, 250);
}

function resizeCanvasProportionally() {
    // Calculate new canvas size based on current screen aspect ratio
    let canvasWidth, canvasHeight;
    let screenAspect = window.innerWidth / window.innerHeight;
    
    // Base canvas size calculations
    let maxWidth = min(window.innerWidth * 0.9, 1200);
    let maxHeight = min(window.innerHeight * 0.7, 800);
    
    // Maintain screen aspect ratio while fitting within container
    if (screenAspect > 1.5) {
        // Wide screen - use width-based sizing
        canvasWidth = maxWidth;
        canvasHeight = canvasWidth / screenAspect;
    } else {
        // Tall or square screen - use height-based sizing
        canvasHeight = maxHeight;
        canvasWidth = canvasHeight * screenAspect;
    }
    
    // Ensure minimum size
    canvasWidth = max(canvasWidth, 400);
    canvasHeight = max(canvasHeight, 300);
    
    // Resize the canvas
    resizeCanvas(canvasWidth, canvasHeight);
    
    // Recalculate grid size for pattern sketches
    cellSize = min(width, height) / gridSize;
    
    // Redraw current sketch content
    redrawCurrentSketch();
}

function redrawCurrentSketch() {
    // Clear and redraw background
    background("#FFFFFF");
    
    // Use modular redraw functions from individual sketch files
    switch(currentSketch) {
        case 2: // Letter Typography Explorer
            if (typeof redrawLetterTypography === 'function') {
                redrawLetterTypography();
            }
            break;
            
        case 3: // Mondrian Collage
            if (typeof redrawMondrianCollage === 'function') {
                redrawMondrianCollage();
            }
            break;
            
        case 4: // Magnetic Letter Field
            if (typeof redrawMagneticLetters === 'function') {
                redrawMagneticLetters();
            }
            break;
            
        case 5: // Dynamic Pattern Rectangles
            if (typeof redrawPatternGrid === 'function') {
                redrawPatternGrid();
            }
            break;
            
        case 9: // Shape Trails
            if (typeof redrawShapeTrails === 'function') {
                redrawShapeTrails();
            }
            break;
            
        case 10: // Letter Mosaic
            if (typeof redrawLetterMosaic === 'function') {
                redrawLetterMosaic();
            }
            break;
            
        default:
            // For sketches that don't maintain persistent state,
            // just clear the canvas
            background("#FFFFFF");
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', function() {
    // p5.js will call setup() automatically
}); 