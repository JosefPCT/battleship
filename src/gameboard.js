export { Gameboard }

class Gameboard{
    constructor(){
        this.board = this.createBoard();
        this.logs = [];
    }

    createBoard(width=10,height=10){
      let temp = [];
      for(let i = 0; i < height; i++){
        temp.push([]);
        for(let j = 0; j < width; j++){
          temp[i].push(null);
        }
      }
      console.log(temp);
      return temp
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
    }

    getCell(coordinates){
        let [y, x] = coordinates;
        return this.board[y][x];
    }

    receiveAttack(coordinates){
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
}