var stars;
var numStars = 500;
var speed = 10;

function setup() {
  createCanvas(800, 600);

  stars = [];
  for (var i = 0; i < numStars; i++) {
      var star = new Star();
      stars.push(star);
  }
}

function draw() {
  background(0);

  translate(width/2, height/2);

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

function Star() {
  this.maxZ = 1000;
  this.streakMag = 5;
  this.streakWeight = 0.2;
  this.density = 3;

  this.x = random(-width/this.density, width/this.density);
  this.y = random(-height/this.density, height/this.density);
  this.z = random(50, this.maxZ);

  this.vel = createVector(0, 0);
  this.size = 7;

  this.show = function() {
    fill(255);
    noStroke();

    var ss = map(this.z, 0, this.maxZ, this.size, 0);
    var sx = map(this.x/this.z, 0, 1, 0, width);
    var sy = map(this.y/this.z, 0, 1, 0, height);
    ellipse(sx, sy, ss, ss);

    stroke(220);
    var streakLength = this.z + speed*this.streakMag;
    var px = map(this.x/streakLength, 0, 1, 0, width);
    var py = map(this.y/streakLength, 0, 1, 0, height);

    strokeWeight(ss * this.streakWeight);
    line(sx, sy, px, py);
  }

  this.update = function() {
    this.z = this.z - speed;

    if (this.z <= 0) {
      this.x = random(-width/this.density, width/this.density);
      this.y = random(-height/this.density, height/this.density);
      this.z = random(this.maxZ * 0.9, this.maxZ);
    }
  }
}
