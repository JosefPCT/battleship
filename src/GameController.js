import { Player } from "./player.js";

export {GameController}

class GameController{
  constructor(player1= new Player(), player2= new Player('Computer')){
    this.player1 = player1;
    this.player2 = player2;
  }
}