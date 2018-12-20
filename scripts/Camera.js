function Camera(ctx){
  var that = this;
  this.ctx = ctx;
  this.marginLeft = 0;
  var maxMargin = 4200;
  this.init = function(actor){
    var difference = actor.property.canvasX - Math.abs(that.marginLeft);
    if(difference>800){
      that.moveRight();
    }else{
      that.moveLeft();
    }
  }

  this.moveRight = function(){
    if(that.marginLeft >=-maxMargin){
      that.marginLeft -= 5;
      that.ctx.canvas.style.marginLeft = that.marginLeft+'px';
    }
  }

  this.moveLeft = function(){
    if(that.marginLeft < 0){
      that.marginLeft += 5;
      that.ctx.canvas.style.marginLeft = that.marginLeft+'px';
    }
  }
}
