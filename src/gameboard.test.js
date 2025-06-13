import { Gameboard } from './gameboard.js'

describe('Game board class', () => {
    test('Gameboard instantiation', () => {
        let actual = new Gameboard();
        expect(actual).toBeInstanceOf(Gameboard);
    });
});