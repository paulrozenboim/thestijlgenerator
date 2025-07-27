let liveBurst = null;
let bursts = [];

function initializeSketch7() {
    liveBurst = null;
    bursts = [];
    background("#FFFFFF");
    console.log("Sketch 7 initialized: Generative Color Burst");
}

// Remove the separate mousePressed/mouseReleased functions and create functions that app.html can call
function startColorBurst() {
    const originX = mouseX;
    const originY = mouseY;
    const burstLines = int(random(12, 24));
    liveBurst = [];

    for (let i = 0; i < burstLines; i++) {
        let angle = random(TWO_PI);
        liveBurst.push({
            originX,
            originY,
            angle,
            length: 0,
            maxLength: random(60, 300),
            speed: random(2, 5),
            color: random(MONDRIAN_COLORS.filter(c => c !== "#FFFFFF")),
            circleSize: random(10, 20),
            strokeWeight: random(3, 6)
        });
    }
}

function endColorBurst() {
    if (liveBurst) {
        bursts.push(liveBurst);
        liveBurst = null;
    }
}

function drawColorBurst() {
    background(255);

    // Draw finished bursts
    for (let burst of bursts) {
        drawBurst(burst, false);
    }

    // Animate current burst
    if (liveBurst) {
        for (let ray of liveBurst) {
            ray.length = min(ray.length + ray.speed, ray.maxLength);
        }
        drawBurst(liveBurst, true);
    }
}

function drawBurst(burst, isLive) {
    for (let ray of burst) {
        let x2 = ray.originX + cos(ray.angle) * ray.length;
        let y2 = ray.originY + sin(ray.angle) * ray.length;

        stroke(ray.color);
        strokeWeight(ray.strokeWeight);
        line(ray.originX, ray.originY, x2, y2);

        fill(ray.color);
        noStroke();
        ellipse(x2, y2, ray.circleSize, ray.circleSize);
    }
}
