import React from "react";
import Sketch from "react-p5";

	let x = 50;
	let y = 50;
    
    let a, aa;
    var _angnoise, _radiusnoise;
    var _xnoise, _ynoise;
    let _angle;
    var _radius;
    var _strokeCol = 254;
    var _strokeChange = -1;
    
export default (props) => {
	const setup = (p5, canvasParentRef) => {
        _angle = -p5.PI/2
        p5.smooth();
        p5.frameRate(60);
        p5.noFill();
    
        _angnoise = p5.random(10);
        _radiusnoise = p5.random(10);
        _xnoise = p5.random(10);
        _ynoise = p5.random(10);
    
        p5.createCanvas(1000, 1000).parent(canvasParentRef);
        p5.background(0);
	};

	const draw = (p5) => {
        console.log(p5.frameCount);
        if (p5.frameCount >= 500) {
            p5.noLoop();
        }
    
        drawBackground();
    
        for (let index = 0; index < p5.frameCount; index++) {
            drawWaveClock()
        }
	};

    const drawBackground = (p5) => {
        var a = p5.int(p5.random(0, 1000));
        var aa = p5.int(p5.random(0, 1000));
        
        var b = p5.int(p5.random(0, 1000));
        var bb = p5.int(p5.random(0, 1000));
    
        var c = p5.int(p5.random(0, 1000));
        var cc = p5.int(p5.random(0, 1000));
        
        var d = p5.int(p5.random(0, 1000));
        var dd = p5.int(p5.random(0, 1000));
        
        var e = p5.int(p5.random(0, 1000));
        var ee = p5.int(p5.random(0, 1000));
    
        var counter = 0;
        for (let index = 2000; index > 0; index -= 50) {
            // stroke('white');
            p5.colorMode(p5.RGB, 80)
            let curr = index / 50;
    
            
            p5.noStroke()
            p5.fill(80, 80, 0, curr);
            p5.square(a - index/2, aa - index/2, index);
            // stroke('purple');
            // strokeWeight(10);
            // point(a, aa);
    
            
            p5.noStroke()
            p5.fill(80, 0, 0, curr);
            p5.square(b - index/2, bb - index/2, index);
            // stroke('purple');
            // strokeWeight(10);
            // point(b, bb);
    
            p5.fill(0, 0, 80, curr);
            p5.ellipse(c, cc, index, index);
            p5.fill(0, 80, 0, curr);
            p5.ellipse(d, dd, index, index);
            p5.fill(0, 80, 80, curr);
            p5.ellipse(e, ee, index, index);
            // p5.saveCanvas(str(p5.frameCount) + ' - ' + str(counter), 'png');
            counter++;
    
            console.log(curr);
        }
    }
    
    const drawWaveClock = (p5) => {
        // console.log(p5.frameCount);
        // if (p5.frameCount >= 100) {
        //     noLoop();
        // }
    
        _radiusnoise += 0.005;
        _radius = (p5.noise(_radiusnoise) * 550) + 20;
    
        _angnoise += 0.005;
        _angle += (p5.noise(_angnoise) *8) - 3;
    
        if(_angle > 360) { _angle -= 360; }
        if(_angle < 0) { _angle += 360; }
    
        _xnoise += 0.02;
        _ynoise += 0.02;
        var centerX = p5.width/2 + (p5.noise(_xnoise) * 200) - 100;
        var centerY = p5.height/2 + (p5.noise(_ynoise) * 200) - 100;
    
        var rad = p5.radians(_angle);
        var x1 = centerX + (_radius * p5.cos(rad));
        var y1 = centerY + (_radius * p5.sin(rad));
    
        var opprad = rad + p5.PI;
        var x2 = centerX + (_radius * p5.cos(opprad));
        var y2 = centerY + (_radius * p5.sin(opprad));
    
        p5.stroke(0, 0, 0, 60);
        p5.strokeWeight(2);
        p5.line(x1, y1, x2, y2)
    }

    

	return <Sketch setup={setup} draw={draw} />;
};