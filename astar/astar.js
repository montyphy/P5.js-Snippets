function AStar(grid, start, end) {
  this.grid = grid;
  this.start = start;
  this.end = end;

  this.pathCol = color(65, 150, 255);
  this.openCol = color(120, 200, 255);
  this.closedCol = color(195, 220, 255);
  this.pointCol = color(100, 100, 255);

  this.openSet = new ArrayExt();
  this.closedSet = new Array();
  this.path = new Array();

  this.closestSpot = undefined; // The spot known to be closest to the goal
  this.openSet.push(this.start);

  this.finised = false;

  this.isNoSolution = function() {
    return this.openSet.length === 0;
  };

  this.isFinished = function() {
    return this.finished;
  };

  this.getFittest = function() {
    // Return the spot with the best fitness
    var fittest = 0;
    for (var i=0; i < this.openSet.length; i++) {
      if (this.openSet[i].f < this.openSet[fittest].f) {
        fittest = i;
      }
    }
    return this.openSet[fittest];
  };

  this.getDistance = function(current, neighbour) {
    return 1;
  };

  this.getManhattenCost = function(a, b) {
    // Manhatten distance
    var di = abs(a.i - b.i);
    var dj = abs(a.j - b.j);
    var cost = di + dj;
    return cost;
  };

  this.step = function() {
    // If finished
    if ( this.isFinished() ) {
      return 0;   // Do nothing
    }

    // If it's not known that there is no possible solution
    if ( !this.isNoSolution() ) {
      // Get the best spot from the openSet
      var current = this.getFittest();

      // If the spot is the goal
      if (current === this.end) {
        this.finished = true;         // Finished
        console.log("DONE");

        this.path = this.generatePath(current);   // Generate the path to goal

        return 2;
      }
      // else
      // Update the sets
      this.openSet.remove(current);
      this.closedSet.push(current);

      // Check all neighbours of current spot
      var neighbours = current.neighbours;
      for (var i=0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];

        // If neighbour has already been evaluated or a wall
        if ( this.closedSet.includes(neighbour) || neighbour.wall ) {
          continue;                       // Skip it
        }

        // Get the cost of travelling to this neighbour from the start spot
        var tempG = current.g + this.getDistance(current, neighbour);

        // If neighbour is a newly discovered spot
        if ( !this.openSet.includes(neighbour) ) {
          this.openSet.push(neighbour);   // Add it
        }
        // Else if this cost is more than a previously found cost for
        // this neighbour
        else if ( tempG >= neighbour.g ) {
          continue;     // Skip it
        }
        // else
        // This is a new spot or cheaper path then it must be better
        neighbour.g = tempG;
        neighbour.h = this.getManhattenCost(neighbour, this.end);
        neighbour.f = neighbour.g + neighbour.h;

        // Update path
        neighbour.previous = current;
        this.path = this.generatePath(current);

        // If this is the closest to the goal
        if ( !this.closestSpot || neighbour.h < this.closestSpot.h ) {
          this.closestSpot = neighbour;
        }
      }
      return 1;
    }
    // else
    this.path = this.generatePath( this.closestSpot );
    this.finished = true;
    console.log('No solution');
    return -1;
  };

  this.generatePath = function(spot) {
    if (!spot) {
      return [];
    }

    path = [spot];
    while (spot.previous) {
      spot = spot.previous;
      path.push(spot);
    }
    return path;
  };

  this.showPath = function(col) {
    for (var i=0; i < this.path.length; i++) {
      this.path[i].show(col);
    }
  };

  this.show = function() {
    function showSet(set, col) {
      for(var i=0; i < set.length; i++) {
        spot = set[i];
        spot.show(col);
      }
    }

    // Show progress
    showSet(this.openSet, this.openCol);
    showSet(this.closedSet, this.closedCol);
    this.showPath(this.pathCol);

    // Show start and end
    this.start.show(this.pointCol);
    this.end.show(this.pointCol);

  };
}
