function Rocket(pos, vel) {
  this.cull = false;
  this.exploded = false;
  this.explosion;

  this.pos = pos;
  this.vel = vel;

  this.applyForce = function(force) {
    this.vel.add(force);
  }

  this.show = function() {
    if (!this.exploded) {
      colorMode(RGB);
      stroke(255);
      strokeWeight(2);
      line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-10);
    }
    else {
      this.explosion.show();
    }
  }

  this.update = function() {
    if (!this.exploded) {
      this.pos.add(vel);
      if (this.vel.y > -0.2) {
        this.exploded = true;
        this.explosion = new Explosion(this.pos);
      }
    }
    else {
      this.explosion.update();
      if (this.explosion.cull) {
        this.cull = true;
      }
    }
  }
}
