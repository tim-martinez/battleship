import { describe, expect, it } from 'vitest';
import { Ship } from '../src/modules/ship.js';

describe('Ship Class', () => {
  it('should register a hit', () => {
    const tug = new Ship('tug', 5);
    tug.hit();
    expect(tug.hits).toBe(1);
  });

  it('should sink when hit enough times', () => {
    const sub = new Ship('sub', 3);
    sub.hit();
    sub.hit();
    sub.hit();
    expect(sub.status).toBe('sunk');
  });
});
