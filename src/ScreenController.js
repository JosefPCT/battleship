import { GameController } from './GameController.js';
import { Ship } from './ship.js';
import { Player } from './player.js';

export { ScreenController }

class ScreenController{
    constructor(){
      // this.gc = new GameController(player1= new Player(), player2= new Player('Computer'));
      // this.gc = new GameController(player1,player2);
      this.gc;

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
        let tmpArr = [parseInt(e.target.dataset.y), parseInt(e.target.dataset.x)];
        if(this.sendAttackEvent(tmpArr)){
          this.victoryEvent();
        } 
        else {
          if(this.gc.getLatestLogOfActivePlayer().successfulHit){
            this.gc.removeShipCellOfOpponent(tmpArr, null);
          } else {
            this.gc.removeShipCellOfOpponent(tmpArr, null);
          }
          
          this.switchTurnRender();
        };
      }

      // Stored event handler
      this.modeEventListener = (e) =>{
        console.log(e.target.id);
        if(e.target.id === 'player-button'){
          this.vsPlayerMode();
        } else {
          this.vsComputerMode();
        }
      }


      this.placeShipListener = (e, player) => {
        // console.log(e.target.previousSibling.value);
        // console.log(e.target.parentNode.firstChild.dataset.shiplength);
        console.log(e.target);
        console.log(player);

        let parent = e.target.parentNode;
        let y = parseInt(e.target.previousSibling.value);
        let x = parseInt(e.target.previousSibling.previousSibling.value);
        let shipLength = parseInt(e.target.parentNode.firstChild.dataset.shiplength);
        let button = e.target;
        let message = e.target.nextSibling;
    
        let gameboard = player.playerBoard;
        // console.log(typeof y);
        // console.log(typeof x);
        // console.log(typeof shipLength);
        
        if(gameboard.placeShip([x,y], new Ship(shipLength))){
          console.log('Successful place');
          message.textContent = 'Succesful place';
          parent.removeChild(button);
        } else {
          console.log(`Can't place there`);
          message.textContent = `Can't place ship there. Try again`;
        }
        
      };

      this.continueOpposingPlayerListener = (e) => {
        console.log('Continuining to place ship of other player');
        this.renderPlaceShip(this.gc.getOpposingPlayer());
      };

      this.continueGameListener = (e) => {
        this.clearHelper()
        this.buildActivePlayerBoard();
        this.buildOpposingBoard();
      }
      
      // this.defaultSetup();
      // this.buildActivePlayerBoard();
      // this.buildOpposingBoard();

      this.showModeSelector();

    }

    vsPlayerMode(){
      console.log('Two players mode');
      this.clearHelper();
      let nameInput = prompt('Please enter a name for player 1', 'Player 1');
      let nameInput2 = prompt('Please enter a name for player 2', 'Player 2');
      let tmpgc = new GameController(nameInput,nameInput2);
      this.gc = tmpgc;
      this.renderPlaceShip(this.gc.getActivePlayer());
    }

    vsComputerMode(){

    }

    renderPlaceShip(player){
      let mainDiv = document.getElementById('main');
      mainDiv.textContent = `${player.name}'s Ships`;
      let arrShips = [ new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
      let continueButton = document.createElement('button');

      arrShips.forEach((elem, ind) => {
        let shipDiv = document.createElement('div');
        let para = document.createElement('p');
        let inputY = document.createElement('input');
        let inputX = document.createElement('input');
        let button = document.createElement('button');
        let errorMessageSpan = document.createElement('span');
        
        
        shipDiv.classList.add('ship');
        para.textContent = `Ship ${ind + 1}, with the length of ${elem.length}`;
        para.setAttribute('data-shiplength', `${elem.length}`);
        inputY.setAttribute('name','y');
        inputY.setAttribute('type', 'number');
        inputY.setAttribute('value', '0');
        inputY.setAttribute('min', '0');
        inputY.setAttribute('max', '9');

        inputX.setAttribute('name','x');
        inputX.setAttribute('type', 'number');
        inputX.setAttribute('value', '0');
        inputX.setAttribute('min', '0');
        inputX.setAttribute('max', '9');
        
        button.id = 'place-ship';
        button.textContent = 'Place Ship';
        // button.addEventListener('click', this.placeShipListener(e,player));
        button.addEventListener('click', (e) => {
          this.placeShipListener(e, player);
        });

  
        shipDiv.appendChild(para);
        shipDiv.appendChild(inputY);
        shipDiv.appendChild(inputX);
        shipDiv.appendChild(button);
        shipDiv.appendChild(errorMessageSpan);
        mainDiv.appendChild(shipDiv);
        
      });

      continueButton.id = 'continue-button';
      if(player.name === this.gc.getActivePlayerName()){
        continueButton.textContent = 'Continue to place ship of the other player'
        continueButton.addEventListener('click', this.continueOpposingPlayerListener);
      } else {
        continueButton.textContent = 'Continue with game';
        continueButton.addEventListener('click', this.continueGameListener);
      }

      mainDiv.appendChild(continueButton);
    }

    showModeSelector(){
      this.clearHelper();
      let mainDiv = document.getElementById('main');
      // mainDiv.innerHTML = `
      // <button> Vs Another Player</button>
      // <button> Vs Computer </button>`;
      let modeComputerButton = document.createElement('button');
      let modePlayerButton = document.createElement('button')

      modeComputerButton.setAttribute('id','computer-button');
      modePlayerButton.setAttribute('id','player-button');

      modeComputerButton.textContent = 'Vs Computer';
      modePlayerButton.textContent = 'Vs Another Player';

      modeComputerButton.addEventListener('click', this.modeEventListener);
      modePlayerButton.addEventListener('click', this.modeEventListener);

      mainDiv.appendChild(modePlayerButton);
      mainDiv.appendChild(modeComputerButton);
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

    //Helper method for the event handler of click events to call on the receiveAttack method of the opposing opponent's gameboard, also adds a message on the screen regarding the information on the clicked grid
    sendAttackEvent(coordinates){

      let message = this.gc.hitOpponent(coordinates);
      let log = this.gc.generateActionLog(message, coordinates);
      this.gc.addLogToActivePlayer(log);

      let messageEventDiv = document.getElementById('messageEvent');
      messageEventDiv.textContent = this.gc.getLatestLogOfActivePlayer().message;

      return this.gc.allShipsOfOpposingPlayerHasSunk();
    }

    //Helper method for the event handler if a hit does not result to victory, to display a screen that indicates the switching of turns, clears the board, and rebuilds the new activePlayer board and opposingplayer board
    switchTurnRender(){
      this.removingListeners();
      let activePlayerAreaDiv = document.getElementById('activePlayerArea');
      let opposingPlayerAreaDiv = document.getElementById('opposingPlayerArea');
      let messageEventDiv = document.getElementById('messageEvent');

      // Used setTimeout to add delay before going to the next turn
      // Might refactor to wait for a click instead before going to the next turn
      setTimeout(() => {
        activePlayerAreaDiv.innerHTML = '';
        opposingPlayerAreaDiv.innerHTML = '';
        messageEventDiv.innerHTML = '';

        this.gc.switchTurn();
        
        if(this.gc.getActivePlayerName() === 'Computer'){
          let coordinates = this.gc.generateComputerCoordinates();
          if(this.sendAttackEvent(coordinates)){
            this.victoryEvent();
          } else {
            if(this.gc.getLatestLogOfActivePlayer().successfulHit){
              this.gc.removeShipCellOfOpponent(coordinates, null);
            } else {
              this.gc.removeShipCellOfOpponent(coordinates, null);
            }
            messageEventDiv.textContent = `Computer is attacking. ${this.gc.getLatestLogOfActivePlayer().message}`;
            this.switchTurnRender();
          }
        } else {
          console.log(this.gc.activePlayer);
          this.buildActivePlayerBoard();
          this.buildOpposingBoard();
        }
      }, 3000);
    }

    // Helper method for the vent handler if a hit results into a victory, Display to the screen who the victor is
    victoryEvent(){
      this.clearHelper();
      let messageEventDiv = document.getElementById('messageEvent');
      messageEventDiv.textContent = `${this.gc.activePlayer.name} is the Winner!`;
    }

    // Method to help setup the board without having the player manually placeShips
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
            } 
            else if(board[i][j].timesHit > 0){
              columnDiv.classList.add('damagedShip');
            } 
            else {
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
        // let board = this.gc.opposingPlayer.playerBoard.board;
        let board = this.gc.getOpposingPlayerBoard();
        let row = board.length;
        let column = board[0].length;
        let coordinateLogs = this.gc.generateActivePlayerCoordinateLogs();

        let playArea = document.getElementById('opposingPlayerArea');

        for(let i = 0; i < row; i++){
          let rowDiv = document.createElement('div');
          rowDiv.classList.add(`row`);
          for(let j = 0; j < column; j++){
            let columnDiv = document.createElement('div');
            columnDiv.setAttribute('data-y', `${i}`);
            columnDiv.setAttribute(`data-x`, `${j}`);
            columnDiv.classList.add(`column`);

            if(coordinateLogs.includes([parseInt(i),parseInt(j)].join())){
              let logMessage = this.gc.getLogFromId([i,j]).successfulHit;
              
              if(logMessage){
                columnDiv.classList.add('destroyedShip');
              } else {
                columnDiv.classList.add('missedCell');
              }
            } else {
              // Moved the event handler to an arrow function instead of a separate method to preserve this context
              columnDiv.addEventListener('click', this.clickListener);
              columnDiv.addEventListener('mouseenter', this.mouseenterListener);
              columnDiv.addEventListener('mouseleave', this.mouseleaveListener);
            };
          
            rowDiv.appendChild(columnDiv);
          }
          playArea.appendChild(rowDiv);
        }
    }


    // Method to show logs of the active players
    showLogs(){
      console.log('Creating logs...');
      let logContainer = document.getElementById('messageLogs');
      let logList = this.gc.getActivePlayerLogs();
      let len = logList.length;
      let turnNumber = 1;
      let i = 0;

      logContainer.innerHTML = '';

      while(len > 0){
        // console.log("Entering log loop");
        let logDiv = document.createElement('p');
        logDiv.textContent = `Turn ${turnNumber}: ${logList[i].message}`;
        logContainer.prepend(logDiv);
        len--;
        turnNumber++;
        i++
      }
    }

    // Helper method to clear the html
    clearHelper(){
      let activePlayerAreaDiv = document.getElementById('activePlayerArea');
      let opposingPlayerAreaDiv = document.getElementById('opposingPlayerArea');
      let messageEventDiv = document.getElementById('messageEvent');
      let messageLogs = document.getElementById('messageLogs');
      let mainDiv = document.getElementById('main');

      activePlayerAreaDiv.innerHTML = '';
      opposingPlayerAreaDiv.innerHTML = '';
      messageEventDiv.innerHTML = '';
      messageLogs.innerHTML = '';
      mainDiv.innerHTML = '';
    }




}