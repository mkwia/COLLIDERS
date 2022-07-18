let a, aa;

var _angnoise, _radiusnoise;
var _xnoise, _ynoise;
let _angle;
var _radius;

function setup() {
    _angle = -PI/2
    smooth();
    frameRate(60);
    noFill();

    _angnoise = random(10);
    _radiusnoise = random(10);
    _xnoise = random(10);
    _ynoise = random(10);

    createCanvas(1000, 1000);
    background(0);
}

function draw() {
    console.log(frameCount);
    if (frameCount >= 1) {
        noLoop();
    }

    drawBackground();

    // for (let index = 0; index < frameCount; index++) {
    //     drawWaveClock()
    // }

    // saveCanvas(str(frameCount), 'png');
}

function drawBackground() {
    a = int(random(0, 1000));
    aa = int(random(0, 1000));
    
    b = int(random(0, 1000));
    bb = int(random(0, 1000));

    c = int(random(0, 1000));
    cc = int(random(0, 1000));
    
    d = int(random(0, 1000));
    dd = int(random(0, 1000));
    
    e = int(random(0, 1000));
    ee = int(random(0, 1000));

    var counter = 0;
    for (let index = 2000; index > 0; index -= 50) {
        // stroke('white');
        colorMode(RGB, 80)
        let curr = index / 50;

        
        noStroke()
        fill(80, 80, 0, curr);
        square(a - index/2, aa - index/2, index);
        // stroke('purple');
        // strokeWeight(10);
        // point(a, aa);

        
        noStroke()
        fill(80, 0, 0, curr);
        square(b - index/2, bb - index/2, index);
        // stroke('purple');
        // strokeWeight(10);
        // point(b, bb);

        fill(0, 0, 80, curr);
        ellipse(c, cc, index, index);
        fill(0, 80, 0, curr);
        ellipse(d, dd, index, index);
        fill(0, 80, 80, curr);
        ellipse(e, ee, index, index);
        // saveCanvas(str(frameCount) + ' - ' + str(counter), 'png');
        counter++;

        console.log(curr);
    }
}

function drawWaveClock() {
    // console.log(frameCount);
    // if (frameCount >= 100) {
    //     noLoop();
    // }

    _radiusnoise += 0.005;
    _radius = (noise(_radiusnoise) * 550) + 20;

    _angnoise += 0.005;
    _angle += (noise(_angnoise) *8) - 3;

    if(_angle > 360) { _angle -= 360; }
    if(_angle < 0) { _angle += 360; }

    _xnoise += 0.02;
    _ynoise += 0.02;
    var centerX = width/2 + (noise(_xnoise) * 200) - 100;
    var centerY = height/2 + (noise(_ynoise) * 200) - 100;

    rad = radians(_angle);
    x1 = centerX + (_radius * cos(rad));
    y1 = centerY + (_radius * sin(rad));

    opprad = rad + PI;
    x2 = centerX + (_radius * cos(opprad));
    y2 = centerY + (_radius * sin(opprad));

    stroke(0, 0, 0, 60);
    strokeWeight(2);
    line(x1, y1, x2, y2)
}