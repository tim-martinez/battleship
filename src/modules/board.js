export class Board {
  constructor(size) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedXY = [];
    this.hitXY = [];
    this.ships = null;
    this.shipsXY = [];
  }

  checkLose() {
    if (this.ships === 0) {
      return true;
    }
    return false;
  }

  removeShip(ship) {
    // Check if ship type already exists and erase it
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] && this.grid[row][col].name === ship.name) {
          this.grid[row][col] = null;
        }
      }
    }
  }

  placeShip(ship, x, y, horizontal) {
    if (!this.isValidPlacement(ship, x, y, horizontal)) {
      return false;
    }

    this.removeShip(ship);

    if (horizontal) {
      for (let i = 0; i < ship.length; i++) {
        this.grid[y][x + i] = ship;
        this.shipsXY.push([x + i, y]);
        // console.log('Updated shipsXY:', this.shipsXY);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.grid[y + i][x] = ship;
        this.shipsXY.push([x, y + i]);
        // console.log('Updated shipsXY:', this.shipsXY);
      }
    }

    this.ships++;

    //ship placed succesfully
    return true;
  }

  isValidPlacement(ship, x, y, horizontal) {
    //check if placement out of bounds
    if (horizontal) {
      if (x + ship.length > this.grid[0].length) return false;
    } else {
      if (y + ship.length > this.grid.length) return false;
    }

    //check if cells are occupied
    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        if (this.grid[y][x + i] !== null) return false;
      } else {
        if (this.grid[y + i][x] !== null) return false;
      }
    }

    //valid ship placement
    return true;
  }

  attack(x, y) {
    if (
      this.hitXY.some((element) => element[0] === x && element[1] === y) ||
      this.missedXY.some((element) => element[0] === x && element[1] === y)
    ) {
      //this coordinate has already been attacked, return false
      return false;
    }

    if (this.grid[y][x] === null) {
      this.missedXY.push([x, y]);
      return true;
    } else {
      const ship = this.grid[y][x];
      this.hitXY.push([x, y]);
      ship.hit();

      if (ship.status === 'sunk') {
        this.ships--;
        return ship;
      }

      //good hit
      return true;
    }
  }
}
