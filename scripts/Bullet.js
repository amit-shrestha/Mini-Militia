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

  this.init = function(){
    that.ctx.lineWidth = 2;
    that.ctx.save();
    that.ctx.beginPath();
    that.ctx.moveTo(that.initialX+that.vx*100, that.initialY+that.vy*100);
    that.ctx.lineTo(that.initialX+that.vx*150, that.initialY+that.vy*150);
    that.ctx.strokeStyle = that.color;
    that.ctx.stroke();
    that.ctx.closePath();
    that.ctx.restore();
    that.update();
  }

  this.update = function(){
      that.initialX += that.vx*BULLET_SPEED;
      that.initialY += that.vy*BULLET_SPEED;
  }
  
  this.detectCollision = function(mapArray){
    if(that.initialX+that.vx*150 >= that.ctx.canvas.width || that.initialX+that.vx*150 <= 0 || that.initialY+that.vy*150 >= that.ctx.canvas.height || that.initialY+that.vy*150 <= 0){
      // return true;
    }
    var yPos = Math.floor(Math.abs(that.initialY)/BLOCK_SIZE);
    var xPos = Math.floor(Math.abs(that.initialX)/BLOCK_SIZE);
    // console.log('Y: '+yPos);
    // console.log('X: '+xPos);
    if(mapArray[yPos] != undefined){
      if(mapArray[yPos][xPos] != undefined){
        //sand
        if(mapArray[yPos][xPos] === 1 || mapArray[yPos][xPos] === 2 || mapArray[yPos][xPos] === 3){
          
          // console.log('sand detected');
          return true;
        }
      }
    }
    return false;
  }
  
  this.init();

}