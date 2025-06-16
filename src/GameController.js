import { Player } from "./player.js";

export {GameController}

class GameController{
  constructor(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = this.player1;
    this.opposingPlayer = this.player2;
  }

  switchTurn(){
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

  getActivePlayerBoard(){
    return this.getActivePlayer().playerBoard.board;
  }

  getOpposingPlayerBoard(){
    return this.getOpposingPlayer().playerBoard.board;
  }

  // Method to check if the opponent is a Computer, returns true or false
  opponentIsComputer(){
    return this.getOpposingPlayerName() === 'Computer' ? true : false;
  }

  currentPlayerIsComputer(){
    return this.getActivePlayerName() === 'Computer' ? true : false;
  }

  hitOpponent(coordinates){
    return this.opposingPlayer.playerBoard.receiveAttack(coordinates);
  }

  generateActionLog(value, coordinates){
    if(value === 'Hit!'){
      return { id: coordinates.join(), successfulHit: true, coordinates, message: `You hit a ship at y:${coordinates[0]}, x:${coordinates[1]}`};
    }
    if(value === 'Miss!'){
      return { id: coordinates.join(), successfulHit: false, coordinates, message: `Missed! No ship at y:${coordinates[0]}, x:${coordinates[1]}`};
    }
  }

  addLogToActivePlayer(log){
    this.getActivePlayer().playerBoard.logs.push(log);
  }

  getLatestLogOfActivePlayer(){
    let logs = this.getActivePlayer().playerBoard.logs
    return logs[logs.length - 1];
  }

  getActivePlayerLogs(){
    return this.getActivePlayer().playerBoard.logs;
  }

  // Method that generate a logs of only coordinates, in a joined string format
  generateActivePlayerCoordinateLogs(){
    let logs = this.getActivePlayerLogs();
    let coordinateLogs = [];
    logs.forEach((obj) => {
      console.log(obj.id);
      coordinateLogs.push(obj.id);
    });
    return coordinateLogs;
  }

  getLogFromId(value){
    console.log('Entering getLogFromId method');
    let logs = this.getActivePlayerLogs();
    for(let i = 0; i < logs.length; i++){
      if(logs[i].id === value.join()){
        return logs[i];
      }
    }
    return null;
  }

  allShipsOfOpposingPlayerHasSunk(){
    return this.getOpposingPlayer().playerBoard.allShipsSunk();
  }
  

  removeShipCellOfOpponent(coordinates, newValue){
    this.opposingPlayer.playerBoard.setCell(coordinates, newValue);
  }

  generateComputerCoordinates(){
    console.log('Generating coordinates...');
    let y = this.getRandomInteger(0, this.getOpposingPlayerBoard().length - 1);
    let x = this.getRandomInteger(0, this.getOpposingPlayerBoard().length - 1);
    return [y,x];
  }

  getRandomInteger(min, max){
    let minVal = Math.ceil(min);
    let maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  }
}