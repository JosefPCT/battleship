import { experiments } from 'webpack';
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

    test('Instantied ships must fill the correct grid in regards to its length', () => {
      let gameboard = new Gameboard();
      gameboard.board[0][0] = new Ship(3);
      expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
      expect(gameboard.board[1][0]).toBeInstanceOf(Ship);
      expect(gameboard.board[2][0]).toBeInstanceOf(Ship);
      expect(gameboard.board[3][0]).not.toBeInstanceOf(Ship);
    });
});