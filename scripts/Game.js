function Game(assets){
  var that = this;
  this.retry;
  this.canvas;
  this.info;
  this.ctx;
  this.map;
  this.actor;
  this.camera;
  this.assets = assets;
  this.detectCollision;
  this.gameAnimation;
  this.util;
  this.bulletArray = [];
  this.botArray = [];
  this.weaponArray = [];
  this.botCounter = 0;
  this.weaponDropCounter = 0;
  this.gameOver = false;
  this.enableSwap = false;
  this.swapHandle = false;
  this.isGamePaused = false;
  this.key = {
    W: false,
    A: false,
    S: true,
    D: false
  }
  this.numOfBots = 5;
  this.botGunDamage = 1;
  this.defaultGunDamage = 1;
  this.smgGunDamage = 1.5;
  this.totalWeaponDrop = 3;

  this.init = function(){
    this.canvas = document.getElementById('canvas');
    this.retry = document.getElementsByClassName('retry-btn')[0];
    this.info = document.getElementById('info');
    this.ctx = this.canvas.getContext('2d');
    this.map = new Map(this.ctx, assets);
    this.detectCollision = new DetectCollision(that.ctx, that.map.mapArray);
    this.camera = new Camera(that.ctx);
    this.actor = new Actor(that.ctx, assets, that.detectCollision, that.camera, that.bulletArray, that);
    this.util = new Utils();
    this.addEventListeners();
    this.run();
  }

  this.run = function(){
    if(that.isGamePaused === true){
      that.info.style.display = 'block';
      document.getElementsByClassName('retry-btn')[0].style.display = 'none';
      document.getElementById('kill').innerHTML = that.actor.kill;
      document.getElementById('score').innerHTML = that.actor.kill * 10;
      document.getElementsByClassName('respawn-div')[0].innerHTML = [];
      that.gameAnimation = requestAnimationFrame(that.run);
    }else{
      that.info.style.display = 'none';
      that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
      that.drawMap();
      that.generateBot();
      that.drawActor();
      that.showEnemyDirection();
      that.moveActor();
      that.drawFire();
      that.checkHit();
      that.dropGun();
      that.findGun();
      that.checkHealth();
      if(!that.gameOver){
        that.gameAnimation = requestAnimationFrame(that.run);
      }
    }
  }

  this.generateBot = function(){
    if(that.botArray.length<that.numOfBots && that.botCounter%200 === 0){
      that.botArray.push(new Bot(that.ctx, assets, that.detectCollision, that.actor, that.bulletArray));
    }
    that.botCounter++;
  }

  this.drawActor = function(){
    that.actor.draw();
    if(that.botArray.length > 0){
      for(var i=0;i<that.botArray.length;i++){
        that.botArray[i].draw();
      }
    }
  }

  this.showEnemyDirection = function(){
    if(that.botArray.length > 0){
      for(var i=0;i<that.botArray.length;i++){
        var dx = that.actor.property.canvasX - that.botArray[i].botProperty.canvasX;
        var dy = that.actor.property.canvasY - that.botArray[i].botProperty.canvasY;
        if(dx <= 700){
          var angle = Math.atan2(dy, dx);
          that.ctx.save();
          that.ctx.beginPath();
          that.ctx.lineWidth = 2;
          that.ctx.translate(that.actor.property.canvasX, that.actor.property.canvasY);
          that.ctx.rotate(angle);
          that.ctx.moveTo(-150, 0);
          that.ctx.lineTo(-120, -25);
          that.ctx.lineTo(-120, 25);
          that.ctx.lineTo(-150, 0);
          that.ctx.strokeStyle = 'red';
          that.ctx.stroke();
          that.ctx.closePath();
          that.ctx.restore();
        }
      }
    }
  }

  this.moveActor = function(){
    that.actor.move();
    if(that.botArray.length > 0){
      for(var i=0;i<that.botArray.length;i++){
        that.botArray[i].move();
      }
    }
  }

  this.drawMap = function(){
    that.map.draw();
  }

  this.drawFire = function(){
    if(that.bulletArray.length > 0){
      for(var i=0;i<that.bulletArray.length;i++){
        that.bulletArray[i].init();
        that.bulletArray[i].update();
      }
    }
  }

  this.checkHit = function(){
    if(that.bulletArray.length > 0){
      for(var i=0;i<that.bulletArray.length;i++){
        if(that.bulletArray[i].detectCollision(that.map.mapArray) === true){
          that.bulletArray.splice(i, 1);
          break;
        }
        if(that.bulletArray[i].actor.character === 'actor'){
          for(var j=0;j<that.botArray.length;j++){
            if(that.bulletArray[i].fX >= that.botArray[j].botProperty.canvasX && that.bulletArray[i].fX <= that.botArray[j].botProperty.canvasX+that.botArray[j].botProperty.characterWidth && that.bulletArray[i].fY >= that.botArray[j].botProperty.canvasY && that.bulletArray[i].fY <= that.botArray[j].botProperty.canvasY+that.botArray[j].botProperty.characterHeight){
              if(that.bulletArray[i].actor.defaultGun){
                that.botArray[j].botProperty.health -= that.defaultGunDamage;
              }else{
                that.botArray[j].botProperty.health -= that.smgGunDamage;
              }
              that.bulletArray.splice(i, 1);
              break;
            }
          }
        }else if(that.bulletArray[i].actor.character === 'bot'){
          if(that.bulletArray[i].fX >= that.actor.property.canvasX && that.bulletArray[i].fY >= that.actor.property.canvasY && that.bulletArray[i].fY <= that.actor.property.canvasY+that.actor.property.canvasY+that.actor.property.characterHeight){
            that.bulletArray.splice(i, 1);
            if(that.actor.property.health>0){
              that.actor.property.health -= that.botGunDamage;
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
        that.actor.kill += 1;
      }
    }
  }

  this.respawn = function(){
    that.removeEventListeners();
    var respawnValue = 5;
    that.info.style.display = 'block';
    document.getElementsByClassName('retry-btn')[0].style.display = 'none';
    document.getElementById('kill').innerHTML = that.actor.kill;
    document.getElementById('score').innerHTML = that.actor.kill * 10;
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
        that.actor.defaultGun = true;
        that.gameOver = false;
        that.addEventListeners();
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
    document.getElementById('kill').innerHTML = that.actor.kill;
    document.getElementById('score').innerHTML = that.actor.kill * 10;
    document.getElementsByClassName('respawn-div')[0].innerHTML = [];
    document.getElementsByClassName('retry-btn')[0].style.display = 'block';
  }

  this.dropGun = function(){
    if(that.weaponDropCounter%1000 == 0){
      that.weaponArray.push(new Weapon(that.ctx, that.detectCollision, that.assets));
    }
    that.weaponDropCounter++;
    if(that.weaponArray.length > 0){
      for(var i=0;i<that.weaponArray.length;i++){
        that.weaponArray[i].draw();
        that.weaponArray[i].drop();
      }
      if(that.weaponArray.length > that.totalWeaponDrop){
        that.weaponArray.shift();
      }
    }
  }

  this.findGun = function(){
    if(that.weaponArray.length > 0){
      for(var i=0;i<that.weaponArray.length;i++){
        if(that.actor.property.canvasX+that.actor.property.characterWidth >= that.weaponArray[i].weapon.canvasX && that.actor.property.canvasX+that.actor.property.characterWidth <= that.weaponArray[i].weapon.canvasX + that.weaponArray[i].weapon.characterWidth && that.actor.property.canvasY+that.actor.property.characterHeight >= that.weaponArray[i].weapon.canvasY && that.actor.property.canvasY+that.actor.property.characterHeight <= that.weaponArray[i].weapon.canvasY+that.weaponArray[i].weapon.characterHeight){
          that.ctx.drawImage(that.assets.getImage('swap'), 0, 0, 50, 50, that.actor.property.canvasX+20, that.actor.property.canvasY-30, 30, 30);
          if(that.enableSwap === true && that.swapHandle === false){
            that.swapGun(i);
          }
        }
      }
    }
  }

  this.swapGun = function(i){
    var temp = that.actor.defaultGun;
    that.actor.defaultGun = that.weaponArray[i].weapon.defaultGun;
    that.weaponArray[i].weapon.defaultGun = temp;
    that.swapHandle = true;
  }

  this.addEventListeners = function(){
    document.addEventListener("keydown", this.keyPressed);
    document.addEventListener("keyup", this.keyReleased);
    document.addEventListener("mousemove", this.mouseMoved);
    document.addEventListener("mousedown", this.mouseClicked);
    that.retry.addEventListener("click", function(){
      new Game(this.assets);
    });

  }

  this.removeEventListeners = function(){
    document.removeEventListener("keydown", this.keyPressed);
    document.removeEventListener("mousemove", this.mouseMoved);
    document.removeEventListener("mousedown", this.mouseClicked);
  }

  this.keyPressed = function(event){
    switch(event.keyCode){
      case 87:
        that.key['W'] = true;
        break;
      case 65:
        that.key['A'] = true;
        break;
      case 68:
        that.key['D'] = true;
        break;
      case 16:
        that.enableSwap = true;
        break;
      case 13:
        that.isGamePaused = that.isGamePaused ? false:true;
        break;
    }
  }

  this.keyReleased = function(event){
    that.actor.spriteIndexX = 0;
    that.actor.spriteIndexY = 0;
    that.actor.property.spriteHeight = 150;
    that.actor.property.characterHeight = 120;
    switch(event.keyCode){
      case 87:
        that.key['W'] = false;
        break;
      case 65:
        that.key['A'] = false;
        break;
      case 68:
        that.key['D'] = false;
        break;
      case 16:
        that.enableSwap = false;
        that.swapHandle = false;
        break;
    }
  }

  this.mouseMoved = function(event){
    var offset = canvas.getBoundingClientRect();
    var dx = event.clientX - (that.actor.property.canvasX+that.actor.handProperty.x)-offset.left;
    var dy = event.clientY - (that.actor.property.canvasY+that.actor.handProperty.y)+20;
    that.actor.angle = Math.atan2(dy, dx);
    var degree = that.actor.angle*180/Math.PI;
    if(degree<0 && degree<-90 || degree>0 && degree>90){
      that.actor.isFacingRight = false;
    }else{
      that.actor.isFacingRight = true;
    }
  }

  this.mouseClicked = function(event){
    if(event.button === 0){
      that.assets.getAudio('./audio/gunShot.mp3').play();
      var bulletObj ={
        ctx: that.ctx,
        actor: that.actor,
        angle: that.actor.angle,
        face: that.actor.isFacingRight
      }
      that.bulletArray.push(new Bullet(bulletObj));
    }
  }

  this.init();
}

