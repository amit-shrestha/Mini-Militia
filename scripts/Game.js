function Game(assets){
  var that = this;
  this.canvas;
  this.ctx;
  this.map;
  this.actor;
  this.camera;
  this.assets = assets;
  this.detectCollision;
  this.gameAnimation;
  this.bulletArray = [];
  this.botArray = [];
  this.botCounter = 0;
  this.init = function(){
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.map = new Map(this.ctx, assets);
    this.detectCollision = new DetectCollision(that.ctx, that.map.mapArray);
    this.actor = new Actor(this.ctx, assets, this.detectCollision, new Camera(this.ctx), that.canvas, that.bulletArray);
    that.initializePressListener();
    that.initializeReleaseListener();
    that.initializeMouseEventListener();
    that.initializeMouseClickListener();
    that.initializeMouseUnclickListener();
    this.run();
  }

  this.run = function(){
    that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
    that.drawMap();
    if(that.botArray.length<5 && that.botCounter%200 === 0){
      that.botArray.push(new Bot(that.ctx, assets, that.detectCollision, that.actor, that.bulletArray));
    }
    that.botCounter++;
    that.drawActor();
    that.moveActor();
    that.drawFire();
    that.checkHealth();
    that.gameAnimation = requestAnimationFrame(that.run);
  }

  this.drawActor = function(){
    that.actor.draw();
    for(var i=0;i<that.botArray.length;i++){
      that.botArray[i].draw();
    }
  }

  this.moveActor = function(){
    that.actor.move();
    if(that.botArray.length != undefined){
      for(var i=0;i<that.botArray.length;i++){
        that.botArray[i].move();
      }
    }  
  }

  this.drawMap = function(){
    that.map.draw();
  }

  this.drawFire = function(){
    // console.log(that.bulletArray.length);
    if(that.bulletArray.length != 0){
      for(var i=0;i<that.bulletArray.length;i++){
        that.bulletArray[i].init();
        that.bulletArray[i].update();
        
        if(that.bulletArray[i].detectCollision(that.map.mapArray) === true){
          that.bulletArray.splice(i, 1);
          break;
        }

        if(that.bulletArray[i].actor.character === 'actor'){
          for(var j=0;j<that.botArray.length;j++){
            if(that.bulletArray[i].fX >= that.botArray[j].botProperty.canvasX && that.bulletArray[i].fX <= that.botArray[j].botProperty.canvasX+that.botArray[j].botProperty.characterWidth && that.bulletArray[i].fY >= that.botArray[j].botProperty.canvasY && that.bulletArray[i].fY <= that.botArray[j].botProperty.canvasY+that.botArray[j].botProperty.characterHeight){
              that.bulletArray.splice(i, 1);
              that.botArray[j].botProperty.health -= 1;
              break;
            }
          }
        }else if(that.bulletArray[i].actor.character === 'bot'){
          if(that.bulletArray[i].fX >= that.actor.property.canvasX && that.bulletArray[i].fY >= that.actor.property.canvasY && that.bulletArray[i].fY <= that.actor.property.canvasY+that.actor.property.canvasY+that.actor.property.characterHeight){
            that.bulletArray.splice(i, 1);
            that.actor.property.health -= 1;
            console.log(that.actor.property.health);
            break;
          }
        }

      }
    }
  }

  this.checkHealth = function(){
    if(that.actor.property.health <= 0){
      cancelAnimationFrame(that.gameAnimation);
    }
    for(var i=0;i<that.botArray.length;i++){
      if(that.botArray[i].botProperty.health <= 0){
        that.botArray.splice(i, 1);
      }
    }
  }

  this.initializePressListener = function(){
    document.addEventListener("keydown", this.actor.keyPressed);
  }

  this.initializeReleaseListener = function(){
    document.addEventListener("keyup", this.actor.keyReleased);
  }

  this.initializeMouseEventListener = function(){
    document.addEventListener("mousemove", this.actor.mouseMoved);
  }

  this.initializeMouseClickListener = function(){
    document.addEventListener("mousedown", this.actor.mouseClicked);
  }

  this.initializeMouseUnclickListener = function(){
    document.addEventListener("mouseup", this.actor.mouseUnclicked);
  }

  this.init();
}

