export class Ship{
    constructor(length,timesHit=0,hasSunk=false){
      this.length = length;
      this.timesHit = timesHit;
      this.hasSunk = hasSunk;
    }

    hit(){
      this.timesHit++;
      return this;
    }

    isSunk(){
      if(this.timesHit >= this.length){
        this.hasSunk = true;
      } else {
        this.hasSunk = false;
      }
      return this;
    }
}