function Game(assets){
  var BLOCK_SIZE = 30;
  var that = this;
  this.canvas;
  this.info;
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
  this.kill = 0;
  this.gameOver = false;
  this.init = function(){
    this.canvas = document.getElementById('canvas');
    this.info = document.getElementById('info');
    this.ctx = this.canvas.getContext('2d');
    this.map = new Map(this.ctx, assets);
    this.detectCollision = new DetectCollision(that.ctx, that.map.mapArray);
    this.camera = new Camera(this.ctx);
    this.actor = new Actor(this.ctx, assets, this.detectCollision, this.camera, that.canvas, that.bulletArray);
    this.addEventListeners();
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
    if(!that.gameOver){
      that.gameAnimation = requestAnimationFrame(that.run);
    }
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
            if(that.actor.property.health>0){
              that.actor.property.health -= 1;
            }
            break;
          }
        }

      }
    }
  }

  this.checkHealth = function(){
    if(that.actor.property.health <= 0){
      if(that.actor.property.numOfLives > 1){
        that.gameOver = true;
        cancelAnimationFrame(that.gameAnimation);
        that.respawn();
      }else{
        that.endGame();
      }
    }
    for(var i=0;i<that.botArray.length;i++){
      if(that.botArray[i].botProperty.health <= 0){
        that.botArray.splice(i, 1);
        that.kill += 1;
      }
    }
  }

  this.respawn = function(){
    var respawnValue = 5;
    that.info.style.display = 'block';
    document.getElementById('kill').innerHTML = that.kill;
    document.getElementById('score').innerHTML = that.score;
    var respawnInterval = setInterval(function(){
      document.getElementById('respawn').innerHTML = respawnValue;
      if(respawnValue == 0){
        that.info.style.display = 'none';
        that.actor.property.canvasX = BLOCK_SIZE;
        that.actor.property.canvasY = BLOCK_SIZE;
        that.ctx.canvas.style.marginLeft = 0+'px';
        that.camera.marginLeft = 0;
        that.actor.property.health = 10;
        that.actor.property.jetFuel = 10;
        that.actor.property.numOfLives -= 1;
        that.gameOver = false;
        that.run();
        clearInterval(respawnInterval);
      }else{
        respawnValue -= 1;
      }
    }, 1000);
    
  }

  this.endGame = function(){
    that.gameOver = true;
    cancelAnimationFrame(that.gameAnimation);
    that.removeEventListeners();
    that.info.style.display = 'block';
    document.getElementById('kill').innerHTML = that.kill;
    document.getElementById('score').innerHTML = that.kill * 10;
    document.getElementsByClassName('respawn-div')[0].innerHTML = [];
  }


  this.addEventListeners = function(){
    document.addEventListener("keydown", this.actor.keyPressed);
    document.addEventListener("keyup", this.actor.keyReleased);
    document.addEventListener("mousemove", this.actor.mouseMoved);
    document.addEventListener("mousedown", this.actor.mouseClicked);
  }

  this.removeEventListeners = function(){
    document.removeEventListener("keydown", this.actor.keyPressed);
    // document.removeEventListener("keyup", this.actor.keyReleased);
    document.removeEventListener("mousemove", this.actor.mouseMoved);
    document.removeEventListener("mousedown", this.actor.mouseClicked);
  }

  this.init();
}

