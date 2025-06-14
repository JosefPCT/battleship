import { GameController } from './GameController.js';
import { Player } from './player.js';

describe('Game Controller Module', () => {
  test('Game Controller class must have two players', () => {
    let gc = new GameController();
    expect(gc.player1).toBeInstanceOf(Player);
    expect(gc.player2).toBeInstanceOf(Player);
  });
});