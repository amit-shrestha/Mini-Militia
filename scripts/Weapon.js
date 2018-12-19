function Weapon(ctx, detectCollision, assets){
  var BLOCK_SIZE= 30;
  var that = this;

  this.ctx = ctx;
  this.detectCollision = detectCollision;
  this.assets = assets;
  this.util = new Utils();
  this.weapon = {};
  var dGun = true;
  if(that.util.getRandomNumber(0, 2) === 1){
    dGun = false;
  }
  this.init = function(){
    this.weapon ={
      spriteX: 0,
      spriteY: 0,
      canvasX: that.util.getRandomNumber(10, 188)*BLOCK_SIZE,
      canvasY: BLOCK_SIZE,
      spriteWidth: 70,
      spriteHeight: 50,
      characterWidth: 70,
      characterHeight: 50,
      defaultGun: dGun
    }
  }

  this.draw = function(){
    if(that.weapon.defaultGun){
      that.ctx.drawImage(that.assets.getImage('default-gun'), that.weapon.spriteX, that.weapon.spriteY, that.weapon.spriteWidth, that.weapon.spriteHeight, that.weapon.canvasX, that.weapon.canvasY, that.weapon.characterWidth, that.weapon.characterHeight);
    }else{
      that.ctx.drawImage(that.assets.getImage('enemy-gun-right'), that.weapon.spriteX, that.weapon.spriteY, that.weapon.spriteWidth, that.weapon.spriteHeight, that.weapon.canvasX, that.weapon.canvasY, that.weapon.characterWidth, that.weapon.characterHeight);
    }
  }
  
  this.drop = function(){
    if(!that.detectCollision.detectGround(that.weapon, 83)){
      that.weapon.canvasY += 10;
    }
  }
  
  this.init();
}