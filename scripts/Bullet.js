function Bullet(bulletParameters){
  var BULLET_SPEED = 30;
  var that = this;
  this.bulletParameters = bulletParameters;
  this.ctx = this.bulletParameters.ctx;
  this.actor = this.bulletParameters.actor;
  this.positionToX = this.bulletParameters.positionToX;
  this.positionToY = this.bulletParameters.positionToY;
  this.angle = this.bulletParameters.angle;
  this.face = this.bulletParameters.face;
  this.initialX = that.actor.property.canvasX+that.actor.handProperty.x;
  this.initialY = that.actor.property.canvasY+that.actor.handProperty.y;
  this.vx = Math.cos(that.angle);
  this.vy = Math.sin(that.angle);

  this.init = function(){
    that.ctx.lineWidth = 2;
    that.ctx.save();
    that.ctx.beginPath();
    that.ctx.moveTo(that.initialX+that.vx*100, that.initialY+that.vy*100);
    that.ctx.lineTo(that.initialX+that.vx*150, that.initialY+that.vy*150);
    that.ctx.strokeStyle = 'orange';
    that.ctx.stroke();
    that.ctx.closePath();
    that.ctx.restore();
    that.update();
  }

  this.update = function(){
    that.initialX += that.vx*BULLET_SPEED;
    that.initialY += that.vy*BULLET_SPEED;
  }
  
  this.detectCollision = function(){
  }

  this.init();
}