import { Player } from './modules/player.js';
import * as GUI from './modules/GUI.js';

const player2 = new Player('bob', 'human');
const player1 = new Player('Tim', 'human');

player1.board.placeShip(player1.ships.destroyer, 0, 0, true);
player1.board.placeShip(player1.ships.submarine, 0, 1, true);
player1.board.placeShip(player1.ships.carrier, 5, 5, true);

player2.board.placeShip(player2.ships.destroyer, 0, 0);
player2.board.placeShip(player2.ships.submarine, 2, 0);
player2.board.placeShip(player2.ships.carrier, 5, 5);

GUI.displayBoards(
  player1.board,
  player1.board.shipsXY,
  player2.board,
  player2.board.shipsXY,
);

GUI.attack(player1, player2);
