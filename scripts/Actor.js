function Actor(ctx, assets, detectCollision){
  var BLOCK_SIZE = 30;
  var that = this;
  this.ctx = ctx;
  this.assets = assets;
  this.detectCollision = detectCollision;
  this.key = {};
  this.property = {};
  this.handProperty = {};
  this.bulletArray = [];
  this.mainInterval;
  this.rightFace = true;
  this.spriteIndexX = 0;
  this.spriteIndexY = 0;
  this.counter = 0;
  this.jetFuelCounter = 0;
  
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
      canvasX: 30,
      canvasY: 16*BLOCK_SIZE+5-120,
      jetFuel: 10
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
    if(that.bulletArray.length >=0 ){
      for(var i=0;i<that.bulletArray.length;i++){
        that.bulletArray[i].init();
      }
    }
  }

  this.move = function(){
    if(that.counter>5){
      that.counter =0;
    }
    if(that.property.jetFuel<10 && that.jetFuelCounter==20){
      that.property.jetFuel +=0.5;
    }
    if(that.jetFuelCounter<20){
      that.jetFuelCounter+=1;
    }else{
      that.jetFuelCounter = 0;
    }
    if(that.key['W'] === true){
      if(that.property.jetFuel>0){
        that.property.jetFuel -= 0.1;
        if(!detectCollision.detectGround(that.property, 87)){
          if(!detectCollision.detectBoundary(that.property, 87)){
            that.property.canvasY -= 5;
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
      if(!detectCollision.detectGround(that.property, 83)){
        if(!detectCollision.detectBoundary(that.property, 83)){
          that.property.canvasY += 10;
        }
      } 
    }
    if(that.key['D'] === true){
      if(!detectCollision.detectObstacles(that.property, 68)){
        if(!detectCollision.detectBoundary(that.property, 68)){
          that.property.canvasX += 5;
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
      if(!detectCollision.detectObstacles(that.property, 65)) {
        if(!detectCollision.detectBoundary(that.property, 65)){
          that.property.canvasX -= 5;
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
    // console.log(that.property.jetFuel);
  }

  this.keyPressed = function(event){
    if(event.keyCode === 87){
      that.key['W'] = true;
    }else if(event.keyCode === 65){
      that.key['A'] = true;
    }else if(event.keyCode === 68){
      that.key['D'] = true;
    }
  }

  this.keyReleased = function(event){
    that.spriteIndexX = 0;
    that.spriteIndexY = 0;
    that.property.spriteHeight = 150;
    that.property.characterHeight = 120;
    if(event.keyCode === 87){
      that.key['W'] = false;
    }else if(event.keyCode === 65){
      that.key['A'] = false;
    }else if(event.keyCode === 68){
      that.key['D'] = false;
    }
  }

  this.drawHand = function(){
    if(that.rightFace){
      var hand = that.ctx.createPattern(that.assets.getImage('right-hand-with-gun'), 'no-repeat');
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
      var hand = that.ctx.createPattern(that.assets.getImage('left-hand-with-gun'), 'no-repeat');
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
    var dx = event.clientX - (that.property.canvasX+that.handProperty.x);
    var dy = event.clientY - (that.property.canvasY+that.handProperty.y-10);
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
      var bulletObj ={
        ctx: that.ctx,
        actor: that,
        positionToX: event.clientX,
        positionToY: event.clientY,
        angle: that.angle,
        face: that.rightFace
      }
      that.bulletArray.push(new Bullet(bulletObj));
    }
  }

  this.mouseUnclicked = function(event){
    if(event.button === 0){
      // that.initiateFire = false;
    }
  }

  this.init();

}