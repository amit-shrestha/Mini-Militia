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
  if(that.face === true){
    this.initialX = 130;
  }
  else{
    this.initialX = 100;
  }
  this.initialY = 0;
  this.init = function(){
    that.ctx.lineWidth = 10;
    that.ctx.save();
    that.ctx.beginPath();
    that.ctx.translate(that.actor.property.canvasX+that.actor.handProperty.x, that.actor.property.canvasY+that.actor.handProperty.y);
    that.ctx.rotate(that.angle);
    that.ctx.rect(that.initialX, that.initialY, 80, 2);
    that.ctx.fillStyle = 'orange';
    that.ctx.fill();
    that.ctx.closePath();
    that.ctx.restore();
    that.update();
  }

  this.update = function(){
      that.initialX += 1*BULLET_SPEED;
  }
  
  this.init();
}