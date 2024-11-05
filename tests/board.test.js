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

  it('should determine wether or not an attack hit a ship', () => {
    const board = new Board(10);
    const boat = new Ship('boat', 3);
    board.placeShip(boat, 0, 0, true);

    expect(board.attack(0, 0)).toBe(true);
  });

  it('should not count as an additional hit if this xy was already hit', () => {
    const board = new Board(10);
    const boat = new Ship('boat', 3);
    board.placeShip(boat, 0, 9, true);

    board.attack(1, 9);

    expect(board.attack(1, 9)).toBe(false);
  });

  it('should record the coordinates of a missed shot', () => {
    const board = new Board(10);
    const boat = new Ship('boat', 3);
    board.placeShip(boat, 0, 9, true);

    board.attack(1, 1);

    expect(
      board.missedXY.some((element) => element[0] === 1 && element[1] === 1),
    ).toBe(true);
  });

  it('should send the hit function to the correct ship', () => {
    const board = new Board(10);

    const boat = new Ship('boat', 4);
    board.placeShip(boat, 0, 9, true);

    const tug = new Ship('tug', 2);
    board.placeShip(tug, 9, 0);

    board.attack(9, 0);

    expect(tug.hits).toBe(1);
    expect(boat.hits).toBe(0);
  });

  it('should be able to report whether or not all of their ships have been sunk', () => {
    const board = new Board(10);

    const boat = new Ship('boat', 2);
    board.placeShip(boat, 0, 9, true);

    const tug = new Ship('tug', 2);
    board.placeShip(tug, 9, 0);

    board.attack(0, 9);
    board.attack(1, 9);
    board.attack(9, 0);
    board.attack(9, 1);

    expect(board.ships).toBe(0);
  });
});
