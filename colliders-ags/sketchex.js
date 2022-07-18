const scale = 20
const inc = 0.1
let cols
let rows
let yOff
let xOff
let zOff = 0
let fr
let flowField = []

let particles = []

function setup() {
  createCanvas(1000, 1000)
  pixelDensity(2)
  cols = ~~(width / scale)
  rows = ~~(height / scale)
  fr = createP()

  for (let i = 0; i < 5000; i++) {
    particles[i] = new Particle()
  }
  background(255)
}

function draw() {
  yOff = 0
  for (let y = 0; y < rows; y ++) {
    xOff = 0
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols
      
      let angle = noise(xOff, yOff, zOff) * TWO_PI * 4
      let v = p5.Vector.fromAngle(angle)
      v.setMag(0.1)
      flowField[index] = v
      xOff += inc
      // stroke(0, 40)
      // strokeWeight(1)
      // push()
      // translate(x * scale, y * scale)
      // rotate(v.heading())
      // line(0 ,0, scale, 0)
      // pop()
    }
    yOff += inc
    // zOff += 0.0003
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField)
    particles[i].update()
    particles[i].edges()
    particles[i].show()
  }

  fr.html(~~frameRate())
}

function Particle() {
  this.pos = createVector(random(width), random(height))
  this.vel = createVector(0,0)
  this.acc = createVector(0,0)
  this.maxSpeed = 4
  this.prevPos = this.pos.copy()

  this.update = function() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  this.follow = function(v) {
    let x = ~~(this.pos.x / scale)
    let y = ~~(this.pos.y / scale)
    let index = x + y * cols
    let force = v[index]
    this.applyForce(force)
  }

  this.applyForce = function(f) {
    this.acc.add(f)
  }

  this.show = function() {
    stroke(0, 10)
    strokeWeight(1)
    // point(this.pos.x, this.pos.y)
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.updatePrev()
  }
  this.updatePrev = function() {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }
  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0
      this.updatePrev()
    }
    if (this.pos.x < 0) {
      this.pos.x = width
      this.updatePrev()
    }
    if (this.pos.y > height) {
      this.pos.y = 0
      this.updatePrev()
    }
    if (this.pos.y < 0) {
      this.pos.y = height
      this.updatePrev()
    }
  }
}