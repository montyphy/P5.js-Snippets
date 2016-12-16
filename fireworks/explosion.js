function Explosion(pos) {
  this.cull = false;

  this.pos = pos;
  this.colour = random(0, 255);
  this.lifespan = 60;
  this.radius = 0;

  this.numParticles = 120;
  this.particles = [];

  while(this.particles.length < this.numParticles) {
    var p = new Particle(this.pos);
    this.particles.push(p);
  }

  this.show = function() {
    colorMode(HSB);
    noStroke();
    var b = map(this.lifespan, 60, 0, 255, 0);
    fill(this.colour, 255, b);
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
      this.particles[i].update();
    }
  }

  this.update = function() {
    this.lifespan = this.lifespan - 1;
    this.radius = this.radius + 3;
    if (this.lifespan == 0) {
      this.cull = true;
    }
  }
}

function Particle(pos) {
  this.pos = pos.copy();

  var v = random(0, 3);
  var ang = random(TWO_PI);
  this.vel = createVector(0, v);
  this.vel.rotate(ang);

  this.acc = createVector(0, 0.1);

  this.radius = random(2, 7);

  this.show = function() {
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }
}
