// import { experiments } from 'webpack';
import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

describe('Game board class', () => {
    test('Gameboard instantiation', () => {
        let actual = new Gameboard();
        expect(actual).toBeInstanceOf(Gameboard);
    });

    test('Gameboard class must have a board', () => {
        let actual = new Gameboard();
        expect(actual).toHaveProperty('board');
    });

    test('Gameboard must have a board of 10x10 grid', () => {
        let board = new Gameboard();
        let actual = board.board;
        expect(actual).toHaveLength(10);
    });

    test('Can place ship classes to a cell in the board', () => {
      let gameboard = new Gameboard();
      gameboard.board[0][0] = new Ship(3);
      expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
    });

    test('Instantiated ships must have the correct length', () => {
      let gameboard = new Gameboard();
      gameboard.board[1][6] = new Ship(5);
      expect(gameboard.board[1][6]).toHaveProperty('length',5);
    });

    test('Instantied ships must fill the correct grid in regards to its length, ship length: 3', () => {
      let gameboard = new Gameboard();
      gameboard.placeShip([0,3], new Ship(3));
      expect(gameboard.board[0][3]).toBeInstanceOf(Ship);
      expect(gameboard.board[1][3]).toBeInstanceOf(Ship);
      expect(gameboard.board[2][3]).toBeInstanceOf(Ship);
      expect(gameboard.board[3][3]).not.toBeInstanceOf(Ship)
    });

    test('placeShip function with a ship length of 5', () => {
      let gameboard = new Gameboard();
      let ship = new Ship(5);
      gameboard.placeShip([3,5], ship);
      expect(gameboard.getCell([3,5])).toBeInstanceOf(Ship);
      expect(gameboard.getCell([4,5])).toBeInstanceOf(Ship);
      expect(gameboard.getCell([5,5])).toBeInstanceOf(Ship);
      expect(gameboard.getCell([6,5])).toBeInstanceOf(Ship);
      expect(gameboard.getCell([7,5])).toBeInstanceOf(Ship);
      expect(gameboard.getCell([7,5])).toHaveProperty('length', 5);
      expect(gameboard.getCell([8,5])).not.toBeInstanceOf(Ship);
    });

    test('receiveAttack function, can determine if hit a ship or not', () => {
      let gameboard = new Gameboard();
      let ship = new Ship(3);
      gameboard.placeShip([0,0], ship);
      gameboard.receiveAttack([0,0]);
      gameboard.receiveAttack([1,0]);
      gameboard.receiveAttack([2,0]);
      expect(ship.hasSunk).toBe(true);
    })
});