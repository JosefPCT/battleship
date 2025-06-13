export { Gameboard }

class Gameboard{
    constructor(){
        this.board = this.createBoard();
    }

    createBoard(width=10,height=10){
      let temp = [];
      for(let i = 0; i < height; i++){
        temp.push([]);
        for(let j = 0; j < width; j++){
          temp[i].push([null]);
        }
      }
      console.log(temp);
      return temp
    }

}