import { Player } from "./player.js";

export {GameController}

class GameController{
  constructor(player1= new Player(), player2= new Player('Computer')){
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = this.player1;
    this.opposingPlayer = this.player2;
  }

  switchTurn(){
    // let currentActive = this.activePlayer;
    // let currentOpposing = this.opposingPlayer;
    
    // this.activePlayer = currentOpposing;
    // this.opposingPlayer = currentActive;
    this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
    this.opposingPlayer = this.opposingPlayer === this.player1 ? this.player2 : this.player1;
  }

  // Method to get the current active player
  getActivePlayer(){
    return this.activePlayer;
  }

  // Method to get the current opposing player
  getOpposingPlayer(){
    return this.opposingPlayer;
  }

  getActivePlayerName(){
    return this.activePlayer.name;
  }

  getOpposingPlayerName(){
    return this.opposingPlayer.name;
  }

  // Method to check if the opponent is a Computer, returns true or false
  opponentIsComputer(){
    return this.getOpposingPlayerName() === 'Computer' ? true : false;
  }

  currentPlayerIsComputer(){
    return this.getActivePlayerName() === 'Computer' ? true : false;
  }

  hitOpponent(coordinates){
    this.opposingPlayer.playerBoard.receiveAttack(coordinates);
  }
  

  removeShipCellOfOpponent(coordinates, newValue){
    this.opposingPlayer.playerBoard.setCell(coordinates, newValue);
  }
}