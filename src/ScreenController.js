import { GameController } from './GameController.js';
import { Ship } from './ship.js';

export { ScreenController }

class ScreenController{
    constructor(){
      this.gc = new GameController();

      // Storing an arrow function into variables
      // Stored event handler for click event of buildOpposingBoard
      this.mouseenterListener = (e) => {
        e.target.classList.add('highlight');
      }

      // Stored event handler for click event of buildOpposingBoard
      this.mouseleaveListener = (e) => {
        e.target.classList.remove('highlight');
      }

      // Stored event handler for click event of buildOpposingBoard
      this.clickListener = (e) => {
        console.log('Clicked');
        let tmpArr = [e.target.dataset.y, e.target.dataset.x];
        if(this.sendAttackEvent(tmpArr)){
          this.victoryEvent();
        } else {
          if(this.gc.opposingPlayer.playerBoard.logs[this.gc.opposingPlayer.playerBoard.logs.length - 1].successfulHit){
            this.gc.removeShipCellOfOpponent(tmpArr, 'Destroyed');
          } else {
            this.gc.removeShipCellOfOpponent(tmpArr, 'Missed');
          }
          
          this.switchTurnRender();
        };

        // e.target.removeEventListener('click', this.clickListener);
        
      }

      this.defaultSetup();
      this.buildActivePlayerBoard();
      this.buildOpposingBoard();


    }

    // Helper method to remove listeners once an opposing grid has been clicked
    removingListeners(){
      let columns = document.getElementsByClassName('column');
      for(let i = 0; i < columns.length; i++){
        const column = columns[i];
        column.removeEventListener('click', this.clickListener);
        column.removeEventListener('mouseenter', this.mouseenterListener);
        column.removeEventListener('mouseleave', this.mouseleaveListener);
      }
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

    // Builds the active player board that shows the ships
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
            if(board[i][j] === 'Destroyed'){
              columnDiv.classList.add('destroyedShip');
            }
            else if(board[i][j] === 'Missed'){
              columnDiv.classList.add('missedCell');
            }
            else if(board[i][j].hasSunk){
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
      this.showLogs();
    }

    // Build the opposing board without showing the ship and adding event listener for it to be clickable by the activeplayer
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

            // Moved the event handler to an arrow function instead of a separate method to preserve this context
            columnDiv.addEventListener('click', this.clickListener);
            columnDiv.addEventListener('mouseenter', this.mouseenterListener);
            columnDiv.addEventListener('mouseleave', this.mouseleaveListener);

            rowDiv.appendChild(columnDiv);
          }
          playArea.appendChild(rowDiv);
        }
    }



    // Method to show logs of the active players
    showLogs(){
      console.log('Creating logs...');
      let logContainer = document.getElementById('messageLogs');
      let logList = this.gc.opposingPlayer.playerBoard.logs;
      let len = logList.length;
      let turnNumber = 1;
      let i = 0;

      logContainer.innerHTML = '';

      while(len > 0){
        console.log("Entering log loop");
        let logDiv = document.createElement('p');
        logDiv.textContent = `Turn ${turnNumber}: ${logList[i].message}`;
        logContainer.prepend(logDiv);
        len--;
        turnNumber++;
        i++
      }
    }

    // Event handler helper for buildOpposingBoard method
    // Old Event handler, now moved to the arrow function
    // clickedOpposingGrid(e){
    //     console.log('Clicked!');
    //     console.log(e.target);
    //     console.log(e.target.dataset.y);
    //     console.log(e.target.dataset.x);
    //     let tmpArr = [e.target.dataset.y, e.target.dataset.x];
    //     ScreenController.sendAttackEvent(tmpArr);
    //     // let opposingPlayerBoard = this.gc.opposingPlayer.playerBoard;
    //     // this.gc.opposingPlayer.playerBoard.receiveAttack(tmpArr);
    // }

    //Helper method to call on the receiveAttack method of the opposing opponent's gameboard, also adds a message on the screen regarding the information on the clicked grid
    sendAttackEvent(coordinates){
      this.gc.opposingPlayer.playerBoard.receiveAttack(coordinates);
      console.log(this.gc.opposingPlayer.playerBoard.logs);
      let messageEventDiv = document.getElementById('messageEvent');
      messageEventDiv.textContent = this.gc.opposingPlayer.playerBoard.logs[this.gc.opposingPlayer.playerBoard.logs.length - 1].message;

      // Call on the allShipsHasSunked method of the opposing player board to check for winning condiion, return if true or false
      return this.gc.opposingPlayer.playerBoard.allShipsSunk();
    }

    //Helper method to display a screen that indicates the switching of turns, clears the board, and rebuilds the new activePlayer board and opposingplayer board
    switchTurnRender(){
      this.removingListeners();
      let activePlayerAreaDiv = document.getElementById('activePlayerArea');
      let opposingPlayerAreaDiv = document.getElementById('opposingPlayerArea');
      // Used setTimeout to add delay before going to the next turn
      // Might refactor to wait for a click instead before going to the next turn
      setTimeout(() => {
        activePlayerAreaDiv.innerHTML = '';
        opposingPlayerAreaDiv.innerHTML = '';
        this.gc.switchTurn();
        console.log(this.gc.activePlayer);
        this.buildActivePlayerBoard();
        this.buildOpposingBoard();
      }, 3000);
      
    }

    // Method to call on when victory condition is met
    victoryEvent(){
      this.clearHelper();
      let messageEventDiv = document.getElementById('messageEvent');
      messageEventDiv.textContent = `${this.gc.activePlayer.name} is the Winner!`;
    }

    // Helper method to clear the html
    clearHelper(){
      let activePlayerAreaDiv = document.getElementById('activePlayerArea');
      let opposingPlayerAreaDiv = document.getElementById('opposingPlayerArea');
      let messageEventDiv = document.getElementById('messageEvent');
      let messageLogs = document.getElementById('messageLogs');

      activePlayerAreaDiv.innerHTML = '';
      opposingPlayerAreaDiv.innerHTML = '';
      messageEventDiv.innerHTML = '';
      messageLogs.innerHTML = '';
    }
}