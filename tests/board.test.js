import { describe, expect, it } from 'vitest';
import { Board } from '../src/modules/board.js';
import { Ship } from '../src/modules/ship.js';

describe('Board Class', () => {
  it('should place a ship horizontally', () => {
    const boat = new Ship('boat', 3);
    const board = new Board(10);
    board.placeShip(boat, 0, 0, true);

    expect(board.grid[0][0]).toBe(boat);
    expect(board.grid[0][1]).toBe(boat);
    expect(board.grid[0][2]).toBe(boat);
    expect(board.grid[0][3]).toBe(null);
  });

  it('should place a ship vertically', () => {
    const boat = new Ship('boat', 3);
    const board = new Board(10);
    board.placeShip(boat, 0, 0);

    expect(board.grid[0][0]).toBe(boat);
    expect(board.grid[1][0]).toBe(boat);
    expect(board.grid[2][0]).toBe(boat);
    expect(board.grid[3][0]).toBe(null);
  });

  it('should check if ship placement is valid', () => {
    const boat = new Ship('boat', 3);
    const board = new Board(10);
    board.placeShip(boat, 0, 0, true);

    expect(board.isValidPlacement(boat, 2, 0)).toBe(false);
  });

  it('should return false and abort ship placement if not valid', () => {
    const board = new Board(10);

    const boat = new Ship('boat', 3);
    board.placeShip(boat, 0, 0, true);

    const boat2 = new Ship('boat', 3);

    expect(board.placeShip(boat2, 1, 0)).toBe(false);
  });
});
