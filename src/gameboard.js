export { Gameboard }

class Gameboard{
    constructor(){
        this.board = this.createBoard();
        this.logs = [];
        this.listOfShips = [];
    }

    createBoard(width=10,height=10){
      let temp = [];
      for(let i = 0; i < height; i++){
        temp.push([]);
        for(let j = 0; j < width; j++){
          temp[i].push(null);
        }
      }
    //   console.log(temp);
      return temp;
    }

    placeShip(coordinates, ship){
      // Check if valid coordinates

      // Check if coordinates are out of bounds

      let [y, x] = coordinates;
      // Place ship along grid with regards to its length
      for(let i = 0; i < ship.length; i++){
        this.board[y][x] = ship;
        y++;
      }

      // Put this ship reference into the listOfShips array for easy traversing
      this.listOfShips.push({coordinates, ship});
    }

    getCell(coordinates){
        let [y, x] = coordinates;
        return this.board[y][x];
    }

    receiveAttack(coordinates){
      console.log('Entering receive attack method of Gameboard class');
      let [y, x] = coordinates;
      let ship = this.board[y][x];
      if(ship){
        ship.hit();
        this.logs.push(`Hit a ship! At coordinates; y:${y}, x:${x}`);
        return 'Hit a ship';
      } else {
        this.logs.push(`Missed! Coordinates: y:${y}, x:${x}`);
        return 'Missed!';
      }
    }

    allShipsSunk(){
        let len = this.listOfShips.length;
        let flag = true;
        for(let i = 0; i < len; i++){
            // console.log(this.listOfShips[i].ship.hasSunk);
            if(this.listOfShips[i].ship.hasSunk === false){
              flag = false;
              break;
            }
        }
        return flag;
    }
}