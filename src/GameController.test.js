import { GameController } from './GameController.js';
import { Player } from './player.js';

describe('Game Controller Module', () => {
  test('Game Controller class must have two players', () => {
    let gc = new GameController();
    expect(gc.player1).toBeInstanceOf(Player);
    expect(gc.player2).toBeInstanceOf(Player);
  });

  test('Players must have the correct name', () => {
    let player1 = new Player('Aaron');
    let player2 = new Player('Gimli');
    let gc = new GameController(player1, player2);

    expect(gc.player1.name).toBe('Aaron');
    expect(gc.player2.name).toBe('Gimli');
  });

  test('activePlayer property must initially be player1', () => {
    let player1 = new Player('Aso');
    let gc = new GameController(player1);

    expect(gc.activePlayer.name).toBe(player1.name);
  });

  test('opposingPlayer property must initially be player2', () => {
    let player1 = new Player('Aso');
    let player2 = new Player('Enemy');
    let gc = new GameController(player1,player2);

    expect(gc.activePlayer.name).toBe(player1.name);
    expect(gc.opposingPlayer.name).toBe(player2.name);
  });

  test('switchTurn method thats exchanges activePlayer and opposingPlayer from each other', () => {
    let player1 = new Player('Aaron');
    let player2 = new Player('Computer');
    let gc = new GameController(player1,player2);

    gc.switchTurn();
    expect(gc.activePlayer.name).toBe(player2.name);
    expect(gc.opposingPlayer.name).toBe(player1.name);
  });

  test('switchTurn method thats exchanges activePlayer and opposingPlayer from each other multiple turns', () => {
    let player1 = new Player('Aaron');
    let player2 = new Player('Computer');
    let gc = new GameController(player1,player2);

    gc.switchTurn();
    gc.switchTurn();
    gc.switchTurn();
    expect(gc.activePlayer.name).toBe(player2.name);
    expect(gc.opposingPlayer.name).toBe(player1.name);
  });
});