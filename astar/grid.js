function Grid(rows, cols) {
  this.randomWalls = function(chance) {
    if (chance === undefined) {
      chance = 0.2;
    }

    for (var i=0; i < this.cols; i++) {
      for (var j=0; j < this.rows; j++) {
        if ( random(1) < chance ) {
          this.spots[i][j].wall = true;
        }
      }
    }
  };

  this.loadWalls = function(walls) {
    for (var k=0; k < walls.length; k++) {
      var i = walls[k][0];
      var j = walls[k][1];
      this.spots[i][j].wall = true;
    }
  };

  this.getNeighbours = function(spot) {
    var i = spot.i;
    var j = spot.j;
    var neighbours = [];

    var n;
    if (i > 0) {
      neighbours.push( this.spots[i-1][j] );
    }
    if (i < this.cols-1) {
      neighbours.push( this.spots[i+1][j] );
    }
    if (j > 0) {
      neighbours.push( this.spots[i][j-1] );
    }
    if (j < this.rows-1) {
      neighbours.push( this.spots[i][j+1] );
    }
    return neighbours;
  };

  this.getSpot = function(i, j) {
    return this.spots[i][j];
  };

  this.show = function() {
    for (var i=0; i < this.cols; i++) {
      for (var j=0; j < this.rows; j++) {
        this.spots[i][j].show();
      }
    }
  };

  /*
  *   Initialisation
  */
  this.rows = rows;
  this.cols = cols;
  this.spots = new Array(cols);


  // Determine scale
  var ws = global.width / cols;
  var hs = global.height / rows;

  // Initialise the spots
  for (var i=0; i < this.cols; i++) {
    this.spots[i] = new Array(rows);
    for (var j=0; j < this.rows; j++) {
      var spot = new Spot(i, j, ws, hs);
      this.spots[i][j] = spot;
    }
  }

  // Assign neighbours to spots
  for (var i=0; i < this.cols; i++) {
    for (var j=0; j < this.rows; j++) {
      var spot = this.spots[i][j];
      var n = this.getNeighbours(spot);
      spot.setNeighbours(n);
    }
  }
}
