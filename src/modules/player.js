import { Ship } from './ship.js';
import { Board } from './board.js';

export class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.board = new Board(10, 10);
    this.ships = {
      carrier: new Ship('carrier', 5),
      battleship: new Ship('battleship', 4),
      cruiser: new Ship('cruiser', 3),
      submarine: new Ship('submarine', 3),
      destroyer: new Ship('destroyer', 2),
    };
  }
}
