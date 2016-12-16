var rain;
var numDrops;
var numDropsSlider;

function setup() {
  var canvas = createCanvas(800, 600);
  canvas.parent("canvas");

  numDropsSlider = createSlider(0, 1000, 400, 1);
  numDropsSlider.parent("rain-numdrops");
  numDrops = numDropsSlider.value();

  rain = [];
  for (var i = 0; i < numDrops; i++) {
      var drop = new Drop();
      rain.push(drop);
  }
}

function draw() {
  background(0);
  stroke(100, 200, 250);
  for (var i = rain.length-1; i >= 0; i--) {
    rain[i].update();
    rain[i].show();

    if (rain[i].cull) {
      rain.splice(i, 1);
    }
  }

  if (rain.length < numDropsSlider.value()) {
    var diff = numDropsSlider.value() - rain.length;
    var n = random(diff);
    for (var i = 0; i < n; i++) {
      var drop = new Drop();
      rain.push(drop);
    }
  }
}

function Drop() {
  this.cull = false;

  this.minZ = 0;
  this.maxZ = 5;
  this.minSize = 2;
  this.maxSize = 12;
  this.minVel = 4;
  this.maxVel = 10;

  this.x = random(width);
  this.y = random(-height, height);
  this.z = random(this.minZ, this.maxZ);

  this.size = map(this.z, this.minZ, this.maxZ, this.maxSize, this.minSize);
  this.vel = random(this.maxVel, this.minVel) * map(this.z, this.minZ, this.maxZ, 1, 0.8);
  this.thickness = map(this.z, this.minZ, this.maxZ, 3, 1);

  this.show = function() {
    strokeWeight(this.thickness);
    line(this.x, this.y, this.x, this.y+this.size);
  }

  this.update = function() {
    this.y = this.y + this.vel;
    if (this.y > height) {
      if (rain.length > numDropsSlider.value()) {
        this.cull = true;
      }
      else {
        this.x = random(width);
        this.y = random(-height);
        this.z = random(this.minZ, this.maxZ);
      }
    }
  }
}
