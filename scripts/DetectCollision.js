function DetectCollision(ctx, mapArray){
  var BLOCK_SIZE = 30;
  var that = this;
  this.ctx = ctx;
  this.mapArray = mapArray;

  this.detectGround = function(property, keyCode){
    var yPos;
    var xPos = Math.floor((property.canvasX)/BLOCK_SIZE);
    var xPosWidth = Math.floor((property.canvasX+property.characterWidth)/BLOCK_SIZE);
    if(keyCode === 83){
      yPos = Math.floor((property.canvasY+property.characterHeight-5)/BLOCK_SIZE);
    }else if(keyCode === 87) yPos = Math.floor(property.canvasY/BLOCK_SIZE);
    if(that.mapArray[yPos] != undefined){
      if(that.mapArray[yPos][xPos] != undefined){
        if(that.mapArray[yPos][xPos] === 4 || that.mapArray[yPos][xPos] === 5 || that.mapArray[yPos][xPos] === 6 || that.mapArray[yPos][xPosWidth] === 4 || that.mapArray[yPos][xPosWidth] === 5 || that.mapArray[yPos][xPosWidth] === 6){
          return true;
        }
        if(that.mapArray[yPos][xPos] === 1 || that.mapArray[yPos][xPos] === 2 || that.mapArray[yPos][xPos] === 3 || that.mapArray[yPos][xPosWidth] === 1 || that.mapArray[yPos][xPosWidth] === 2 || that.mapArray[yPos][xPosWidth] === 3){
          return true;
        }
      }
    }
    return false;
  }

  this.detectObstacles = function(property, keyCode){
    var xPos;
    var yPos = Math.floor(property.canvasY/BLOCK_SIZE);
    var yPosFoot = Math.floor((property.canvasY+property.characterHeight)/BLOCK_SIZE);
    var yPosBody = Math.floor((property.canvasY+property.characterHeight/2)/BLOCK_SIZE);
    if(keyCode === 68){
      xPos = Math.floor((property.canvasX+property.characterWidth)/BLOCK_SIZE);
    }
    if(keyCode === 65){
      xPos = Math.floor((property.canvasX)/BLOCK_SIZE);
    }
    if(that.mapArray[yPos] != undefined){
      if(that.mapArray[yPos][xPos] != undefined){
        if(that.mapArray[yPos][xPos] === 7 || that.mapArray[yPos][xPos] === 8 || that.mapArray[yPos][xPos] === 9 || that.mapArray[yPos][xPos] === 10 || that.mapArray[yPos][xPos] === 11 || that.mapArray[yPos][xPos] === 12 || that.mapArray[yPos][xPos] === 13 || that.mapArray[yPos][xPos] === 14){
          return true;
        }
        if(that.mapArray[yPosFoot-1][xPos] === 7 || that.mapArray[yPosFoot-1][xPos] === 8 || that.mapArray[yPosFoot-1][xPos] === 9 || that.mapArray[yPosFoot-1][xPos] === 10 || that.mapArray[yPosFoot-1][xPos] === 11 || that.mapArray[yPosFoot-1][xPos] === 12 || that.mapArray[yPosFoot-1][xPos] === 13 || that.mapArray[yPosFoot-1][xPos] === 14){
          return true;
        }
        if(that.mapArray[yPosBody][xPos] === 7 || that.mapArray[yPosBody][xPos] === 8 || that.mapArray[yPosBody][xPos] === 9 || that.mapArray[yPosBody][xPos] === 10 || that.mapArray[yPosBody][xPos] === 11 || that.mapArray[yPosBody][xPos] === 12 || that.mapArray[yPosBody][xPos] === 13 || that.mapArray[yPosBody][xPos] === 14){
          return true;
        }
      }
    }
    return false;
  }

  this.detectBoundary = function(property, keyCode){
    var xPos = property.canvasX;
    var yPos = property.canvasY;
    if(keyCode === 87){
      if(yPos <= 0) return true;
    }
    if(keyCode === 83){
      if(yPos + property.characterHeight>= that.ctx.canvas.height) return true;
    }
    if(keyCode === 65){
      if(xPos <= 0) return true;
    }
    if(keyCode === 68){
      if(xPos + property.characterWidth >= that.ctx.canvas.width) return true;
    }
    return false;
  }

}