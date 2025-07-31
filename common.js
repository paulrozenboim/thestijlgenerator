// Common JavaScript functions for all sketch pages
// This file consolidates shared functionality across all sketch files

// Common canvas setup function
function setupSketchCanvas() {
    let canvasWidth = windowWidth * 0.7;
    let canvasHeight = windowHeight * 0.6;
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("imageContainer");
    background("#FFFFFF");
    return canvas;
}

// Common resize handler
function resizeSketchCanvas() {
    let canvasWidth = window.innerWidth * 0.7;
    let canvasHeight = window.innerHeight * 0.6;
    resizeCanvas(canvasWidth, canvasHeight);
    background("#FFFFFF");
}

// Add resize event listener
window.addEventListener("resize", resizeSketchCanvas);

// Common save function
function saveCanvasImage() {
    saveCanvas("myCanvas", "png");
}

// Common clear function (basic version - can be overridden per sketch)
function clearCanvas() {
    background("#FFFFFF");
}

// Navigation functions - automatically determine previous/next pages
function getCurrentSketchNumber() {
    const currentPage = window.location.pathname.split('/').pop();
    const match = currentPage.match(/sketch(\d+)\.html/);
    return match ? parseInt(match[1]) : 1;
}

function goToPreviousPage() {
    const currentSketch = getCurrentSketchNumber();
    const previousSketch = currentSketch === 1 ? 20 : currentSketch - 1;
    window.location.href = `sketch${previousSketch}.html`;
}

function goToNextPage() {
    const currentSketch = getCurrentSketchNumber();
    const nextSketch = currentSketch === 20 ? 1 : currentSketch + 1;
    window.location.href = `sketch${nextSketch}.html`;
}

// Common Mondrian color palette
const MONDRIAN_COLORS = ["#FEB400", "#155498", "#018C34", "#D5311F", "#000000", "#FFFFFF"];

// Utility function to get random Mondrian color
function getRandomMondrianColor() {
    return MONDRIAN_COLORS[Math.floor(Math.random() * MONDRIAN_COLORS.length)];
}

// Common setup for DOMContentLoaded
function initializeSketch(setupFunction) {
    if (typeof setupFunction === 'function') {
        window.addEventListener("DOMContentLoaded", setupFunction);
    } else {
        window.addEventListener("DOMContentLoaded", function() {
            setupSketchCanvas();
        });
    }
}

// Export for use in sketch files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupSketchCanvas,
        resizeSketchCanvas,
        saveCanvasImage,
        clearCanvas,
        goToPreviousPage,
        goToNextPage,
        getCurrentSketchNumber,
        MONDRIAN_COLORS,
        getRandomMondrianColor,
        initializeSketch
    };
} 