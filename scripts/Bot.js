function Bot(ctx, assets, detectCollision, actor, bulletArray){
  this.util = new Utils();
  var BOT_SPEED = this.util.getRandomNumber(1, 4);
  var that = this;
  this.ctx = ctx;
  this.assets = assets;
  this.detectCollision = detectCollision;
  this.actor = actor;
  this.bulletArray = bulletArray;
  this.isFacingRight = false;
  this.botProperty = {};
  this.weaponProperty = {};
  this.angle;
  this.dx;
  this.dy;
  this.character = 'bot';
  this.fireCounter = 0;
  this.keyCode;

  this.init = function(){
    that.botProperty = {
      spriteX: [0, 116],
      spriteY: 0,
      spriteWidth: 117,
      spriteHeight: 106,
      characterWidth: 65,
      characterHeight: 75,
      canvasX: that.util.getRandomNumber(10, 188)*BLOCK_SIZE,
      canvasY: BLOCK_SIZE,
      health: 3
    }
    that.weaponProperty = {
      x: 20,
      y: that.botProperty.characterHeight-15,
      width: 70,
      height: 30
    }
  }

  this.draw = function(){
    if((that.botProperty.canvasX - that.actor.property.canvasX)>=0){
      that.isFacingRight = false;
    }else{
      that.isFacingRight = true;
    }
    if(that.isFacingRight){
      that.ctx.drawImage(that.assets.getImage('bot'), that.botProperty.spriteX[1], that.botProperty.spriteY, that.botProperty.spriteWidth, that.botProperty.spriteHeight, that.botProperty.canvasX, that.botProperty.canvasY, that.botProperty.characterWidth, that.botProperty.characterHeight);
    }else{
      that.ctx.drawImage(that.assets.getImage('bot'), that.botProperty.spriteX[0], that.botProperty.spriteY, that.botProperty.spriteWidth, that.botProperty.spriteHeight, that.botProperty.canvasX, that.botProperty.canvasY, that.botProperty.characterWidth, that.botProperty.characterHeight);
    }
    that.drawWeapon();
  }

  this.drawWeapon = function(){
    if(that.isFacingRight){
      var gun = that.ctx.createPattern(that.assets.getImage('enemy-gun-right'), 'no-repeat');
      that.ctx.save();
      that.ctx.beginPath();
      that.ctx.translate(that.botProperty.canvasX+that.weaponProperty.x, that.botProperty.canvasY+that.weaponProperty.y);
      that.ctx.rotate(that.angle);
      that.ctx.rect(0, 0, that.weaponProperty.width, that.weaponProperty.height);
      that.ctx.fillStyle = gun;
      that.ctx.fill();
      that.ctx.closePath();
      that.ctx.restore();
    }else{
      var gun = that.ctx.createPattern(that.assets.getImage('enemy-gun-left'), 'no-repeat');
      that.ctx.save();
      that.ctx.beginPath();
      that.ctx.translate(that.botProperty.canvasX+that.weaponProperty.x+10, that.botProperty.canvasY+that.weaponProperty.y+10);
      that.ctx.rotate(that.angle);
      that.ctx.rect(0, 0, that.weaponProperty.width, that.weaponProperty.height);
      that.ctx.fillStyle = gun;
      that.ctx.fill();
      that.ctx.closePath();
      that.ctx.restore();
    }
  }

  this.move = function(){
    that.dx = that.actor.property.canvasX - that.botProperty.canvasX;
    that.dy = that.actor.property.canvasY - that.botProperty.canvasY;
    that.angle = Math.atan2(that.dy, that.dx);
    var vx = Math.cos(that.angle);
    var vy = Math.sin(that.angle);
    if(that.dx>=200 || that.dx<=-200){
      if(vy>=0) that.keyCode = 83;
      if(vy<0) that.keyCode = 87;
      if(!that.detectCollision.detectGround(that.botProperty, that.keyCode)){
        if(!that.detectCollision.detectBoundary(that.botProperty, that.keyCode)){
          that.botProperty.canvasY += vy*BOT_SPEED;
        }
      }
      if(vx>=0) that.keyCode = 68;
      if(vx<0) that.keyCode = 65;
      if(!that.detectCollision.detectObstacles(that.botProperty, that.keyCode)){
        if(!that.detectCollision.detectBoundary(that.botProperty, that.keyCode)){
          that.botProperty.canvasX += vx*BOT_SPEED;
        }
      }
    }

    if(Math.abs(that.dx)<=500){
      if(that.fireCounter%20 === 0){
        var bulletObj ={
          ctx: that.ctx,
          actor: that,
          angle: that.angle,
          face: that.isFacingRight
        }
        that.assets.getAudio('./audio/gunShot.mp3').play();
        that.bulletArray.push(new Bullet(bulletObj));
      }
      that.fireCounter++;
    }
  }

  this.init();
}
