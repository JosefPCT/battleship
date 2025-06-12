import { Ship } from './ship.js';

describe('Ship Class Test Suite', () => {
  test('Can instantiate a ship class', () => {
    let actual = new Ship();
    expect(actual).toBeInstanceOf(Ship);
  });
});