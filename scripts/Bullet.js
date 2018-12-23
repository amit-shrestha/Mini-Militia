function Bullet(bulletParameters){
  var BULLET_SPEED;
  var BLOCK_SIZE = 30;
  var BULLET_OFFSET = 80;
  var BULLET_SIZE = 20;
  var that = this;
  this.bulletParameters = bulletParameters;
  this.ctx = this.bulletParameters.ctx;
  this.actor = this.bulletParameters.actor;
  this.angle = this.bulletParameters.angle;
  this.face = this.bulletParameters.face;
  if(this.actor.character === 'actor'){
    this.initialX = that.actor.property.canvasX+that.actor.handProperty.x;
    this.initialY = that.actor.property.canvasY+that.actor.handProperty.y;
    if(this.actor.defaultGun){
      this.color = 'blue';
      BULLET_SPEED = 30;
    }else{
      this.color = 'green';
      BULLET_SPEED = 40;
    }

  }else if(this.actor.character === 'bot'){
    this.initialX = that.actor.botProperty.canvasX+that.actor.weaponProperty.x;
    this.initialY = that.actor.botProperty.canvasY+that.actor.weaponProperty.y;
    this.color = 'red';
    BULLET_SPEED = 20;
  }
  this.vx = Math.cos(that.angle);
  this.vy = Math.sin(that.angle);
  this.x = that.initialX+that.vx*BULLET_OFFSET;
  console.log('X: '+that.x);
  this.y = that.initialY+that.vy*BULLET_OFFSET;
  console.log('Y: '+that.y)
  this.fX = that.x+that.vx*BULLET_SIZE;
  this.fY = that.y+that.vy*BULLET_SIZE;

  this.init = function(){
    that.ctx.lineWidth = 3;
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
    that.fX = that.x+that.vx*BULLET_SIZE;
    that.fY = that.y+that.vy*BULLET_SIZE;
  }

  this.detectCollision = function(mapArray){
    if(that.fX >= that.ctx.canvas.width || that.fX <= 0 || that.fY >= that.ctx.canvas.height || that.fX <= 0){
      return true;
    }
    var yPosStart = Math.floor(Math.abs(that.fY)/BLOCK_SIZE);
    var xPosStart = Math.floor(Math.abs(that.fX)/BLOCK_SIZE);
    var yPosEnd = Math.floor(Math.abs(that.y)/BLOCK_SIZE);
    var xPosEnd = Math.floor(Math.abs(that.x)/BLOCK_SIZE);

    if(mapArray[yPosEnd] != undefined && mapArray[yPosStart] != undefined){
      if(mapArray[yPosEnd][xPosEnd] != undefined && mapArray[yPosStart][xPosStart] != undefined){
        //sand
        if(mapArray[yPosEnd][xPosEnd] === 1 || mapArray[yPosEnd][xPosEnd] === 2 || mapArray[yPosEnd][xPosEnd] === 3 || mapArray[yPosStart][xPosStart] === 1 || mapArray[yPosStart][xPosStart] === 2 || mapArray[yPosStart][xPosStart] === 3){
          return true;
        }
        //grass
        if(mapArray[yPosEnd][xPosEnd] === 4 || mapArray[yPosEnd][xPosEnd] === 5 || mapArray[yPosEnd][xPosEnd] === 6 || mapArray[yPosStart][xPosStart] === 4 || mapArray[yPosStart][xPosStart] === 5 || mapArray[yPosStart][xPosStart] === 6){
          return true;
        }
        //vertical-sand
        if(mapArray[yPosEnd][xPosEnd] === 7 || mapArray[yPosEnd][xPosEnd] === 8 || mapArray[yPosEnd][xPosEnd] === 13 || mapArray[yPosEnd][xPosEnd] === 14 || mapArray[yPosStart][xPosStart] === 7 || mapArray[yPosStart][xPosStart] === 8 || mapArray[yPosStart][xPosStart] === 13 || mapArray[yPosStart][xPosStart] === 14){
          return true;
        }
        //side-sand
        if(mapArray[yPosEnd][xPosEnd] === 9 || mapArray[yPosEnd][xPosEnd] === 10 || mapArray[yPosEnd][xPosEnd] === 11 || mapArray[yPosEnd][xPosEnd] === 12 || mapArray[yPosStart][xPosStart] === 9 || mapArray[yPosStart][xPosStart] === 10 || mapArray[yPosStart][xPosStart] === 11 || mapArray[yPosStart][xPosStart] === 12){
          return true;
        }
      }
    }
    return false;
  }

}
