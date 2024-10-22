import { Ship } from './ship.js';

export class Board {
  constructor(size) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
  }

  //print game in console
  print() {
    this.grid.forEach((element) => {
      const updatedElement = element.map((item) => {
        if (item === null) {
          return '[ ]';
        }
        return '[S]';
      });
      console.log(updatedElement.join(''));
    });
  }

  placeShip(ship, x, y, horizontal) {
    if (!this.isValidPlacement(ship, x, y, horizontal)) {
      return false;
    }

    if (horizontal) {
      for (let i = 0; i < ship.length; i++) {
        this.grid[y][x + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.grid[y + i][x] = ship;
      }
    }

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

    return true;
  }
}
