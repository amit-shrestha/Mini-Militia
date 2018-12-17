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
    if(that.botArray.length<5){
      that.botArray.push(new Bot(that.ctx, assets, that.detectCollision, that.actor, that.bulletArray));
    }
    that.drawActor();
    that.moveActor();
    that.drawFire();
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
    if(that.bulletArray.length >=0 ){
      for(var i=0;i<that.bulletArray.length;i++){
        that.bulletArray[i].init();
        that.bulletArray[i].update();
        if(that.bulletArray[i].detectCollision(that.map.mapArray) === true){
          that.bulletArray.splice(i, 1);
        }
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

