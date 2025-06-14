import { GameController } from './GameController.js';
import { Ship } from './ship.js';

export { ScreenController }

class ScreenController{
    constructor(){
      this.gc = new GameController();
      this.defaultSetup();
      this.buildMyBoard();
    }

    defaultSetup(){
      let activePlayerBoard = this.gc.activePlayer.playerBoard;
      activePlayerBoard.placeShip([0,0], new Ship(3));
      activePlayerBoard.placeShip([5,5], new Ship(1));
      activePlayerBoard.placeShip([3,3], new Ship(5));
    }
    buildMyBoard(){
      let board = this.gc.activePlayer.playerBoard.board;
      let row = board.length;
      let column = board[0].length;

      let playArea = document.getElementById('playArea');

      for(let i = 0; i < row; i++){
        let rowDiv = document.createElement('div');
        rowDiv.classList.add(`row`);
        for(let j = 0; j < column; j++){
          let columnDiv = document.createElement('div');
          columnDiv.classList.add('column');
          columnDiv.setAttribute('y', `${i}`);
          columnDiv.setAttribute('x', `${j}`);
          if(board[i][j] !== null){
            columnDiv.classList.add('hasShip');
          }
          rowDiv.appendChild(columnDiv);
        }
        playArea.appendChild(rowDiv);
      }
    }
}