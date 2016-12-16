var particles;
var numParticles;
var gravity;

function setup() {
  var canvas = createCanvas(800, 600);
  canvas.parent("canvas");

  gravity = createVector(0, 0.1);
  numParticles = 15;

  particles = [];
  while(particles.length < numParticles) {
    var rocket = createRocket();
    particles.push(rocket);
  }
}

function draw() {
  background(0);

  for (var i = particles.length-1; i >= 0; i--) {
    if (particles[i].cull) {
      particles[i] = createRocket();
    }

    particles[i].show();
    particles[i].update();
    particles[i].applyForce(gravity);
  }
}

function createRocket() {
  var x = random(40, width-40);
  var pos = createVector(x, height);
  var v = random(-6, -10);
  var vel = createVector(0, v);
  var rocket = new Rocket(pos, vel);

  return rocket;
}
