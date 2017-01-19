function Spot(i, j, ws, hs) {
  this.i = i;   // row pos
  this.j = j;   // col pos

  this.ws = ws;  // width scale
  this.hs = hs;  // height scale

  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbours = [];
  this.previous = undefined;

  this.wall = false;
  this.openCol = color(144, 112, 244);
  this.wallCol = color(112, 8, 216);

  this.setNeighbours = function(neighbours) {
    this.neighbours = neighbours;
  };

  this.show = function(colour) {
    var x = this.i * this.ws;
    var y = this.j * this.hs;

    if ( !colour ) {
      colour = this.openCol;
    }
    if ( this.wall ) {
      colour = this.wallCol;
    }

    fill(colour);
    noStroke();
    rect(x, y, ws, hs);
  };
}
