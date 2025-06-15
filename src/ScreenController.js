import { GameController } from './GameController.js';
import { Ship } from './ship.js';

export { ScreenController }

class ScreenController{
    constructor(){
      this.gc = new GameController();
      this.defaultSetup();
      this.buildActivePlayerBoard();
      this.buildOpposingBoard();
    }

    defaultSetup(){
      let activePlayerBoard = this.gc.activePlayer.playerBoard;
      activePlayerBoard.placeShip([0,0], new Ship(3));
      activePlayerBoard.placeShip([5,5], new Ship(1));
      activePlayerBoard.placeShip([3,3], new Ship(5));
      activePlayerBoard.getCell([3,3]).hit().hit().hit().hit().hit();
      

      let opposingPlayerBoard = this.gc.opposingPlayer.playerBoard;
      opposingPlayerBoard.placeShip([1,1], new Ship(1));
    }

    buildActivePlayerBoard(){
      let board = this.gc.activePlayer.playerBoard.board;
      let row = board.length;
      let column = board[0].length;

      let playArea = document.getElementById('activePlayerArea');

      for(let i = 0; i < row; i++){
        let rowDiv = document.createElement('div');
        rowDiv.classList.add(`row`);
        for(let j = 0; j < column; j++){
          let columnDiv = document.createElement('div');
          columnDiv.classList.add('column');
          columnDiv.setAttribute('y', `${i}`);
          columnDiv.setAttribute('x', `${j}`);
          if(board[i][j] !== null){
            if(board[i][j].hasSunk){
              columnDiv.classList.add('destroyedShip');
            } else if(board[i][j].timesHit > 0){
              columnDiv.classList.add('damagedShip');
            } else {
              columnDiv.classList.add('hasShip');
            }
          }
          rowDiv.appendChild(columnDiv);
        }
        playArea.appendChild(rowDiv);
      }
    }

    buildOpposingBoard(){
        let board = this.gc.opposingPlayer.playerBoard.board;
        let row = board.length;
        let column = board[0].length;

        let playArea = document.getElementById('opposingPlayerArea');

        for(let i = 0; i < row; i++){
          let rowDiv = document.createElement('div');
          rowDiv.classList.add(`row`);
          for(let j = 0; j < column; j++){
            let columnDiv = document.createElement('div');
            columnDiv.classList.add(`column`);
            columnDiv.setAttribute('data-y', `${i}`);
            columnDiv.setAttribute(`data-x`, `${j}`);

            columnDiv.addEventListener('click', this.attack);
            columnDiv.addEventListener('mouseenter', (e) => {
              e.target.classList.add('highlight');
            })
            columnDiv.addEventListener('mouseleave', (e) => {
              e.target.classList.remove('highlight');
            });

            rowDiv.appendChild(columnDiv);
          }
          playArea.appendChild(rowDiv);
        }
    }

    // Event handler helper for buildOpposingBoard method
    attack(e){
        console.log('Clicked!');
        console.log(e.target);
        console.log(e.target.dataset.y);
        console.log(e.target.dataset.x);
    }
}