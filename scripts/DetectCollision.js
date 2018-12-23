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
        switch(that.mapArray[yPos][xPos]){
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            return true;
            break;
        }
        switch(that.mapArray[yPos][xPosWidth]){
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            return true;
            break;
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
        switch(that.mapArray[yPos][xPos]){
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
            return true;
            break;
        }
        switch(that.mapArray[yPosFoot-1][xPos]){
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
            return true;
            break;
        }
        switch(that.mapArray[yPosBody][xPos]){
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
            return true;
            break;
        }
      }
    }
    return false;
  }

  this.detectBoundary = function(property, keyCode){
    var xPos = property.canvasX;
    var yPos = property.canvasY;
    switch(keyCode){
      case 87:
        if(yPos <= 0) return true;
        break;
      case 83:
        if(yPos + property.characterHeight>= that.ctx.canvas.height) return true;
        break;
      case 65:
        if(xPos <= 0) return true;
        break;
      case 68:
        if(xPos + property.characterWidth >= that.ctx.canvas.width) return true;
        break;
    }
    return false;
  }

}
