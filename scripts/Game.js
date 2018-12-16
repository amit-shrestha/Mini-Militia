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
  this.init = function(){
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.map = new Map(this.ctx, assets);
    this.detectCollision = new DetectCollision(that.ctx, that.map.mapArray);
    this.actor = new Actor(this.ctx, assets, this.detectCollision, this.map.mapArray, new Camera(this.ctx), that.canvas);
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
    that.drawActor();
    that.moveActor();
    that.gameAnimation = requestAnimationFrame(that.run);
  }

  this.drawActor = function(){
    that.actor.draw();
  }

  this.moveActor = function(){
    that.actor.move();
  }

  this.drawMap = function(){
    that.map.draw();
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

