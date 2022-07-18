var _angnoise, _radiusnoise;
var _xnoise, _ynoise;
let _angle;
var _radius;
var _strokeCol = 254;
var _strokeChange = -1;

function setup() {
    _angle = -PI/2
    createCanvas(1000, 1000);
    smooth();
    frameRate(60);
    background(20);
    noFill();

    _angnoise = random(10);
    _radiusnoise = random(10);
    _xnoise = random(10);
    _ynoise = random(10);
}

function draw() {
    console.log(frameCount);
    if (frameCount >= 250) {
        noLoop();
    }

    _radiusnoise += 0.005;
    _radius = (noise(_radiusnoise) * 550) + 1;

    _angnoise += 0.005;
    _angle += (noise(_angnoise) *6) - 3;

    if(_angle > 360) { _angle -= 360; }
    if(_angle < 0) { _angle += 360; }

    _xnoise += 0.01;
    _ynoise += 0.01;
    var centerX = width/2 + (noise(_xnoise) * 100) - 50;
    var centerY = height/2 + (noise(_ynoise) * 100) - 50;

    rad = radians(_angle);
    x1 = centerX + (_radius * cos(rad));
    y1 = centerY + (_radius * sin(rad));

    opprad = rad + PI;
    x2 = centerX + (_radius * cos(opprad));
    y2 = centerY + (_radius * sin(opprad));

    _strokeCol += _strokeChange;

    if (_strokeCol > 254) { _strokeChange = -1; }
    if (_strokeCol < 0) { _strokeChange = 1; }

    stroke('white')
    strokeWeight(1);
    line(x1, y1, x2, y2)
}