import { Gameboard } from "./gameboard.js";

export { Player }

class Player{
    constructor(name='Player 1'){
        this.name = name;
        this.playerBoard = new Gameboard();
    }
}