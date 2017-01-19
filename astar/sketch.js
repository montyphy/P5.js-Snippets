function ArrayExt() { }
ArrayExt.prototype = new Array();
ArrayExt.prototype.remove = function(item) {
  for(var i=this.length-1; i >= 0; i--) {
    if (item === this[i]) {
      this.splice(i, 1);
      return true;
    }
  }
  return false;
};


// GLOBALS
var global = {
  width: 800,
  height: 600,
  cols: 80,
  rows: 60,
  steps: 1,     // number of steps to do per draw update
  wallChance: 0.3,
  walls: [
  	[2,0], [3,1], [3, 2], [0, 2], [4, 3], [2, 3], [5, 4], [1, 5], [3, 5], [4, 5],
  	[0, 6], [5, 6], [0, 7], [2, 7], [4, 7], [0, 8], [1, 8], [5, 8], [4, 9],
    [5, 9], [6, 9], [7, 9], [8, 9], [4, 10], [5, 10], [9, 10], [0, 11], [6, 11],
    [9, 11], [0, 12], [3, 12], [4, 12], [9, 12], [0, 13], [4, 13], [5, 13],
    [7, 13], [9, 13], [1, 14], [3, 14], [5, 14], [9, 14], [0, 15], [3, 15],
    [4, 15], [7, 15], [9, 15], [0, 16], [4, 16], [8, 16], [1, 17], [2, 17],
    [4, 17], [6, 17], [8, 17], [3, 18], [8, 18], [4, 19], [6, 19], [8, 19],
  	[4, 20], [7, 20], [5, 21], [7, 21], [8, 21], [9, 21], [5, 22], [10, 22],
  	[6, 23], [7, 23], [9, 23], [8, 24]
  ]
};





function setup() {
  var canvas = createCanvas(global.width, global.height);
  canvas.parent("canvas");

  console.log("A*");

  var grid = new Grid(global.rows, global.cols);
  global.grid = grid;
  global.grid.randomWalls(global.wallChance);
  //global.grid.loadWalls(global.walls);

  var start = grid.getSpot(0, 0);
  var end = grid.getSpot(global.cols-1, global.rows-1);

  start.wall = false;
  end.wall = false;

  global.astar = new AStar(grid, start, end);

  background(0);
  global.grid.show();
}

function draw() {
  for (var i=0; i < global.steps; i++) {
    global.astar.step();
  }
  global.astar.show();
}
