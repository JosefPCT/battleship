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

    test('Can have multiple players with their own board', () => {
        let player = new Player();
        let computer = new Player('computer');
        let ship = new Ship(3);
        let ship2 = new Ship(5);
        let computerShip = new Ship(2);
        let computerShip2 = new Ship(5);
        let computerShip3 = new Ship(1);
        player.playerBoard.placeShip([0,0], ship);
        player.playerBoard.placeShip([3,3], ship2);
        computer.playerBoard.placeShip([0,0], computerShip);
        computer.playerBoard.placeShip([0,1], computerShip2);
        computer.playerBoard.placeShip([0,3], computerShip3);
        expect(player.playerBoard.listOfShips).toHaveLength(2);
        expect(computer.playerBoard.listOfShips).toHaveLength(3);
    });
});