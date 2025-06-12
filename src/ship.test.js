import { Ship } from './ship.js';

describe('Ship Class Test Suite', () => {
  test('Can instantiate a ship class', () => {
    let actual = new Ship();
    expect(actual).toBeInstanceOf(Ship);
  });

  test('Ship must have a length', () => {
    let actual = new Ship(3);
    expect(actual).toHaveProperty('length');
  });

  test('Ship class must confirm the proper length', () => {
    let actual = new Ship(5);
    expect(actual).toHaveProperty('length', 5);
  });

  test('Ship class must confirm proper timesHit', () => {
    let actual = new Ship(2);
    expect(actual).toHaveProperty('timesHit', 0);
  });

  test('Ship class must confirm proper value for hasSunk', () => {
    let actual = new Ship(3);
    expect(actual).toHaveProperty('hasSunk', false);
  });
  
  test('Ship class method hit(), should increase the value of timesHit property by 1 when called', () => {
    let actual = new Ship(3);
    actual.hit();
    expect(actual).toHaveProperty('timesHit', 1);
  });

  test('Ship class method hit(), should increase the value of timesHit property by 3 when called 3 times', () => {
    let actual = new Ship(3);
    actual.hit();
    actual.hit();
    actual.hit();
    expect(actual).toHaveProperty('timesHit', 3);
  });  

  test('Ship class method isSunk(), should return true if timesHit is equal or greater than length of the ship', () => {
    let actual = new Ship(3);
    actual.hit().hit().hit();
    actual.isSunk();
    expect(actual).toHaveProperty('hasSunk', true);
  })
});