var xnoise, ynoise, znoise;
var xangle, yangle, zangle;


function setup() {
    createCanvas(1000, 1000, WEBGL);
    angleMode(DEGREES);

    xnoise = random(10);
    ynoise = random(10);
    znoise = random(10);
}

function draw() {
    background(0);
    // if (frameCount >= 1) {
    //     noLoop();
    // }

    orbitControl();


    fill(255,255,255);
    noStroke();

    rotateY(millis()/50);
    drawCollider()


}

function drawCollider() {
    for (let index = 0; index < 100; index++) {
        xnoise += 0.005;
        ynoise += 0.005;
        znoise += 0.005;
        
        xangle = noise(xnoise) * 10;
        yangle = noise(ynoise) * 10;
        zangle = noise(znoise) * 10;
        // console.log(xangle)
        drawSpoke()
    }
}


function drawSpoke() {  
    
    // factor = random(1);
    
    rotateX(xangle);
    rotateY(yangle);
    rotateZ(zangle);
    box(2, 800, 2);
}


function drawRandomLine() {
    x1 = random(-300, 300);
    y1 = random(-300, 300);
    z1 = random(-300, 300);
    x2 = random(-300, 300);
    y2 = random(-300, 300);
    z2 = random(-300, 300);
    

    stroke(255, 255, 255, 60);
    strokeWeight(2);
    line(x1, y1, z1, x2, y2, z2);
}
