function Weapon(ctx, actor){
  var BULLET_SPEED = 20;
  var that = this;
  this.ctx = ctx;
  this.actor = actor;
  this.initiateFire = false;
  this.positionToX;
  this.positionToY;
  this.angle;
  this.initialX = 0;
  this.initialY = 0;
  this.init = function(){
    if(that.initiateFire === true){
      that.fire();
    }
  }
  

  this.fire = function(){
    that.ctx.lineWidth = 10;
    that.ctx.save();
    that.ctx.beginPath();
    that.ctx.translate(that.actor.property.canvasX+that.actor.handProperty.x, that.actor.property.canvasY+that.actor.handProperty.y);
    that.ctx.rotate(that.angle);
    that.ctx.rect(that.initialX, that.initialY, 80, 2);
    that.ctx.fillStyle = 'black';
    that.ctx.fill();
    that.ctx.closePath();
    that.ctx.restore();
    that.initialX += Math.cos(that.angle)*BULLET_SPEED;
    console.log('initX: '+that.initialX);
  }

  this.mouseClicked = function(event){
    if(event.button === 0){
      that.initiateFire = true;
      var dx = event.clientX - (that.actor.property.canvasX+that.actor.handProperty.x);
      var dy = event.clientY - (that.actor.property.canvasY+that.actor.handProperty.y);
      that.angle = Math.atan2(dy, dx);
      that.positionToX = event.clientX;
      that.positionToY = event.clientY;
    }
  }

  this.mouseUnclicked = function(event){
    if(event.button === 0){
      that.initiateFire = false;
    }
  }
}