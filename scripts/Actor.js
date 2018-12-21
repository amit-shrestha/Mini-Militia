function Actor(ctx, assets, detectCollision, camera, canvas, bulletArray){
  var BLOCK_SIZE = 30;
  var that = this;
  this.ctx = ctx;
  this.assets = assets;
  this.detectCollision = detectCollision;
  this.camera = camera;
  this.key = {};
  this.property = {};
  this.handProperty = {};
  this.bulletArray = bulletArray;
  this.mainInterval;
  this.rightFace = true;
  this.defaultGun = true;
  this.spriteIndexX = 0;
  this.spriteIndexY = 0;
  this.counter = 0;
  this.jetFuelCounter = 0;
  this.healthCounter = 0;
  this.character = 'actor';
  this.speed = 5;
  this.kill = 0;
  this.enableSwap = false;
  this.handle = false;
  this.init = function(){
    that.property = {
      spriteX: [0, 95, 190, 285],
      spriteY: [0, 155],
      spriteWidth: 95,
      spriteHeight: 150,
      spriteHeightJetPack: 185,
      characterWidth: 75,
      characterHeight: 120,
      characterHeightJetPack: 155,
      canvasX: BLOCK_SIZE,
      canvasY: BLOCK_SIZE,
      jetFuel: 10,
      health: 10,
      numOfLives: 3
    }
    that.handProperty = {
      x: 20,
      y: that.property.characterHeight/2.2,
      width: 120,
      height: 30
    }
    that.key = {
      W: false,
      A: false,
      S: true,
      D: false
    }
  }

  this.draw = function(){
    if(that.rightFace) {
      that.ctx.drawImage(that.assets.getImage('character-sprite-right'), that.property.spriteX[that.spriteIndexX], that.property.spriteY[that.spriteIndexY], that.property.spriteWidth, that.property.spriteHeight, that.property.canvasX, that.property.canvasY, that.property.characterWidth, that.property.characterHeight);
    }
    else{
      that.ctx.drawImage(that.assets.getImage('character-sprite-left'), that.property.spriteX[that.spriteIndexX], that.property.spriteY[that.spriteIndexY], that.property.spriteWidth, that.property.spriteHeight, that.property.canvasX, that.property.canvasY, that.property.characterWidth, that.property.characterHeight);
    }
    that.drawHand();
    that.drawStatus();
    that.updateHealthAndJet();
  }

  this.move = function(){
    if(that.counter>5){
      that.counter = 0;
    }
    if(that.key['W'] === true){
      if(that.property.jetFuel>0){
        that.property.jetFuel -= 0.05;
        if(!that.detectCollision.detectGround(that.property, 87)){
          if(!that.detectCollision.detectBoundary(that.property, 87)){
            that.property.canvasY -= that.speed;
            that.spriteIndexY = 1;
            that.property.spriteHeight = that.property.spriteHeightJetPack;
            that.property.characterHeight = that.property.characterHeightJetPack;
          }
        }
      }else{
        that.property.jetFuel=0;
        that.spriteIndexX = 0;
        that.spriteIndexY = 0;
        that.property.spriteHeight = 150;
        that.property.characterHeight = 120;
        that.key['W']=false;
      }
    }else if(that.key['S'] === true){
      if(!that.detectCollision.detectGround(that.property, 83)){
        if(!that.detectCollision.detectBoundary(that.property, 83)){
          that.property.canvasY += that.speed+5;
        }
      }
    }
    if(that.key['D'] === true){
      if(!that.detectCollision.detectObstacles(that.property, 68)){
        if(!that.detectCollision.detectBoundary(that.property, 68)){
          that.property.canvasX += that.speed;
          that.camera.init(that);
          if(that.counter == 5){
            if(that.spriteIndexX<3){
              that.spriteIndexX += 1;
            }else{
              that.spriteIndexX = 0;
            }
          }
          that.counter +=1;
        }
      }
    }else if(that.key['A'] === true){
      if(!that.detectCollision.detectObstacles(that.property, 65)) {
        if(!that.detectCollision.detectBoundary(that.property, 65)){
          that.property.canvasX -= that.speed;
          that.camera.init(that);
          if(that.counter == 5){
            if(that.spriteIndexX<3){
              that.spriteIndexX += 1;
            }else{
              that.spriteIndexX = 0;
            }
          }
          that.counter +=1;
        }
      }
    }
  }

  this.drawStatus = function(){
    var marginLeft = Math.abs(parseInt(that.ctx.canvas.style.marginLeft));
    marginLeft = isNaN(marginLeft) ? 0 : marginLeft;
    that.ctx.drawImage(that.assets.getImage('character-head'), 0, 0, 62, 62, marginLeft + 1150, 20, 30, 30);
    that.ctx.drawImage(that.assets.getImage('num-of-lives'), 0, that.property.numOfLives * 35 - 35, 80, 35, marginLeft + 1190, 30, 30, 15);
    that.ctx.drawImage(that.assets.getImage('status'), marginLeft+50, 10, 20, 50);
    that.ctx.lineWidth = 8;
    that.ctx.beginPath();
    that.ctx.moveTo(marginLeft+80, 15);
    that.ctx.lineTo(marginLeft+80+that.property.health*10, 15);
    that.ctx.strokeStyle = 'green';
    that.ctx.stroke();
    that.ctx.closePath();
    that.ctx.beginPath();
    that.ctx.moveTo(marginLeft+80, 40);
    that.ctx.lineTo(marginLeft+80+that.property.jetFuel*10, 40);
    that.ctx.strokeStyle = 'blue';
    that.ctx.stroke();
    that.ctx.closePath();
    that.ctx.font = '30px Arial';
    that.ctx.fontWeight = 'bold';
    that.ctx.fillStyle = 'white';
    that.ctx.fillText('KILL: '+that.kill, marginLeft+250, 40);
  }

  this.updateHealthAndJet = function(){
    if(that.property.health<10 && that.healthCounter%50 == 0 && that.property.numOfLives>1){
      that.property.health += 1;
    }
    that.healthCounter++;

    if(that.property.jetFuel<10 && that.jetFuelCounter==20){
      that.property.jetFuel +=0.5;
    }
    if(that.jetFuelCounter<20){
      that.jetFuelCounter+=1;
    }else{
      that.jetFuelCounter = 0;
    }
  }

  this.keyPressed = function(event){
    if(event.keyCode === 87){
      that.key['W'] = true;
    }
    if(event.keyCode === 65){
      that.key['A'] = true;
    }
    if(event.keyCode === 68){
      that.key['D'] = true;
    }
    if(event.keyCode === 16){
      that.enableSwap = true;
    }
  }

  this.keyReleased = function(event){
    that.spriteIndexX = 0;
    that.spriteIndexY = 0;
    that.property.spriteHeight = 150;
    that.property.characterHeight = 120;
    if(event.keyCode === 87){
      that.key['W'] = false;
    }
    if(event.keyCode === 65){
      that.key['A'] = false;
    }
    if(event.keyCode === 68){
      that.key['D'] = false;
    }
    if(event.keyCode === 16){
      that.enableSwap = false;
      that.handle = false;
    }
  }

  this.drawHand = function(){
    if(that.rightFace){
      if(that.defaultGun){
        var hand = that.ctx.createPattern(that.assets.getImage('right-hand-with-gun'), 'no-repeat');
      }else{
        var hand = that.ctx.createPattern(that.assets.getImage('right-hand-with-gun2'), 'no-repeat');
      }
      that.ctx.save();
      that.ctx.beginPath();
      that.ctx.translate(that.property.canvasX+that.handProperty.x, that.property.canvasY+that.handProperty.y);
      that.ctx.rotate(that.angle);
      that.ctx.rect(0, 0, that.handProperty.width, that.handProperty.height);
      that.ctx.fillStyle = hand;
      that.ctx.fill();
      that.ctx.closePath();
      that.ctx.restore();
    }
    else{
      if(that.defaultGun){
        var hand = that.ctx.createPattern(that.assets.getImage('left-hand-with-gun'), 'no-repeat');
      }else{
        var hand = that.ctx.createPattern(that.assets.getImage('left-hand-with-gun2'), 'no-repeat');
      }
      that.ctx.save();
      that.ctx.beginPath();
      that.ctx.translate(that.property.canvasX+that.handProperty.x+30, that.property.canvasY+that.handProperty.y+15);
      that.ctx.rotate(that.angle);
      that.ctx.rect(0, 0, that.handProperty.width, that.handProperty.height);
      that.ctx.fillStyle = hand;
      that.ctx.fill();
      that.ctx.closePath();
      that.ctx.restore();
    }
  }

  this.mouseMoved = function(event){
    var offset = canvas.getBoundingClientRect();
    var dx = event.clientX - (that.property.canvasX+that.handProperty.x)-offset.left;
    var dy = event.clientY - (that.property.canvasY+that.handProperty.y)+20;
    that.angle = Math.atan2(dy, dx);
    var degree = that.angle*180/Math.PI;
    if(degree<0 && degree<-90 || degree>0 && degree>90){
      that.rightFace = false;
    }else{
      that.rightFace = true;
    }
  }

  this.mouseClicked = function(event){
    if(event.button === 0){
      that.assets.getAudio('./audio/gunShot.mp3').play();
      var bulletObj ={
        ctx: that.ctx,
        actor: that,
        angle: that.angle,
        face: that.rightFace
      }
      that.bulletArray.push(new Bullet(bulletObj));
    }
  }

  this.init();

}
