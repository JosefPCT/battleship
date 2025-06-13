import { Player } from './player.js';
import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

describe('Player class', () => {
    test('Instantiate a player class', () => {
        let player = new Player();
        expect(player).toBeInstanceOf(Player);
    });

    test('Player should have a name property', () => {
        let player = new Player();
        expect(player.name).toBe('Player 1');
    });

    test('Player can have a custom name,', () => {
        let player = new Player('Aaron');
        expect(player.name).toBe('Aaron');
    });

    test('Player must have their own gameboard', () => {
      let player = new Player();
      expect(player.playerBoard).toBeInstanceOf(Gameboard);
    });

    test('Player must have a full board', () => {
        let player = new Player();
        expect(player.playerBoard.board).toHaveLength(10);
    });

    test('Player board has ships', () => {
        let player = new Player();
        let ship = new Ship(1);
        player.playerBoard.placeShip([5,5], ship);
        expect(player.playerBoard.getCell([5,5])).toBeInstanceOf(Ship);
    });

    test('Player can have ships of length 3', () => {
        let player = new Player();
        let ship = new Ship(3);
        player.playerBoard.placeShip([1,0], ship);
        expect(player.playerBoard.getCell([3,0])).toBeInstanceOf(Ship);
    });
});