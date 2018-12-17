function Bullet(bulletParameters){
  var BULLET_SPEED;
  var BLOCK_SIZE = 30;
  var that = this;
  this.bulletParameters = bulletParameters;
  this.ctx = this.bulletParameters.ctx;
  this.actor = this.bulletParameters.actor;
  this.angle = this.bulletParameters.angle;
  this.face = this.bulletParameters.face;
  if(this.actor.character === 'actor'){
    this.initialX = that.actor.property.canvasX+that.actor.handProperty.x;
    this.initialY = that.actor.property.canvasY+that.actor.handProperty.y;
    this.color = 'orange';
    BULLET_SPEED = 30;
  }else if(this.actor.character === 'bot'){
    this.initialX = that.actor.botProperty.canvasX+that.actor.weaponProperty.x;
    this.initialY = that.actor.botProperty.canvasY+that.actor.weaponProperty.y;
    this.color = 'red';
    BULLET_SPEED = 10;
  }
  this.vx = Math.cos(that.angle);
  this.vy = Math.sin(that.angle);
  this.x = that.initialX+that.vx*100;
  this.y = that.initialY+that.vy*100;
  this.fX = that.x+that.vx*50;
  this.fY = that.y+that.vy*50;
  
  this.init = function(){
    that.ctx.lineWidth = 2;
    that.ctx.save();
    that.ctx.beginPath();
    that.ctx.moveTo(that.x, that.y);
    that.ctx.lineTo(that.fX, that.fY);
    that.ctx.strokeStyle = that.color;
    that.ctx.stroke();
    that.ctx.closePath();
    that.ctx.restore();
  }

  this.update = function(){
    that.x += that.vx*BULLET_SPEED;
    that.y += that.vy*BULLET_SPEED;
    this.fX = that.x+that.vx*50;
    this.fY = that.y+that.vy*50;
  }
  
  this.detectCollision = function(mapArray){
    if(that.fX >= that.ctx.canvas.width || that.fX <= 0 || that.fY >= that.ctx.canvas.height || that.fX <= 0){
      return true;
    }
    var yPos = Math.floor(Math.abs(that.fY)/BLOCK_SIZE);
    var xPos = Math.floor(Math.abs(that.fX)/BLOCK_SIZE);
  
    if(mapArray[yPos] != undefined){
      if(mapArray[yPos][xPos] != undefined){
        //sand
        if(mapArray[yPos][xPos] === 1 || mapArray[yPos][xPos] === 2 || mapArray[yPos][xPos] === 3){
          return true;
        }
        //grass
        if(mapArray[yPos][xPos] === 4 || mapArray[yPos][xPos] === 5 || mapArray[yPos][xPos] === 6){ 
          return true;
        }
        //vertical-sand
        if(mapArray[yPos][xPos] === 7 || mapArray[yPos][xPos] === 8 || mapArray[yPos][xPos] === 13 || mapArray[yPos][xPos] === 14){ 
          return true;
        }
        //side-sand
        if(mapArray[yPos][xPos] === 9 || mapArray[yPos][xPos] === 10 || mapArray[yPos][xPos] === 11 || mapArray[yPos][xPos] === 12){ 
          return true;
        }
      }
    }
    return false;
  }
  
}