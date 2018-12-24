function Bullet(bulletParameters){
  var BULLET_SPEED;
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
  this.y = that.initialY+that.vy*BULLET_OFFSET;
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
        switch(mapArray[yPosEnd][xPosEnd]){
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
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
        switch(mapArray[yPosStart][xPosStart]){
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
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

}
