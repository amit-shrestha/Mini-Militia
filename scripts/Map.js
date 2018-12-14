function Map(ctx, assets){
  var BLOCK_SIZE = 30;
  var that = this;
  this.ctx = ctx;
  this.assets = assets;
  this.totalBlocksRow;
  this.totalBlocksColumn;
  this.mapArray = [];
  this.init = function(){  
    this.totalBlocksColumn = Math.round(that.ctx.canvas.width/BLOCK_SIZE);
    this.totalBlocksRow = Math.round(that.ctx.canvas.height/BLOCK_SIZE);
    for(var row=0;row<this.totalBlocksRow;row++){
      var temp = [];
      for(var column=0;column<this.totalBlocksColumn;column++){
        if(row>=17) temp.push(1);
        else if(row==16) temp.push(2);
        else if(row>=8 && row<=10 && column>=21 && column<=25){
          if(row==8) temp.push(2);
          else temp.push(1);
        }
        else temp.push(0);
      }
      this.mapArray.push(temp);
    }
  }
  
  this.draw =function(){
    for(var row=0;row<that.totalBlocksRow;row++){
      for(var column=0;column<that.totalBlocksColumn;column++){
        if(that.mapArray[row][column]==1){
          that.ctx.drawImage(that.assets.getImage('sand'), 0, 0, 100, 100, column*BLOCK_SIZE, row*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
        else if(that.mapArray[row][column]==2){
          that.ctx.drawImage(that.assets.getImage('grass'), 0, 0, 100, 100, column*BLOCK_SIZE, row*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  }

  this.init();
}

// function getRandomNumber(min, max, multiplier){
//   return Math.floor(Math.random()*(max-min)+min)*multiplier;
// }