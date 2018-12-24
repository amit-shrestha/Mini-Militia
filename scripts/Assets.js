var assets;
var BLOCK_SIZE = 30;
function Assets(){
  this.container = document.getElementsByClassName('container')[0];
  this.container.style.height = window.innerHeight+'px';
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');

  var that = this;
  this.images = {};
  this.imagesLoaded = 0;
  this.loadInterval;

  this.startImage = new Image();
  this.startImage.src = './images/start.png';
  this.startImage.onload = function(){
    that.ctx.drawImage(that.startImage, 0, 0, that.container.offsetWidth, that.canvas.offsetHeight);
  }

  this.init = function()
  {
    this.loadImage('sand', './images/sand.png');
    this.loadImage('grass', './images/grass.png');
    this.loadImage('character-sprite-right', './images/character-sprite-right.png');
    this.loadImage('character-sprite-left', './images/character-sprite-left.png');
    this.loadImage('right-hand-with-gun', './images/right-hand-with-gun.png');
    this.loadImage('left-hand-with-gun', './images/left-hand-with-gun.png');
    this.loadImage('right-hand-with-gun2', './images/right-hand-with-gun2.png');
    this.loadImage('left-hand-with-gun2', './images/left-hand-with-gun2.png');
    this.loadImage('vertical-sand-right', './images/vertical-sand-right.png');
    this.loadImage('vertical-sand-left', './images/vertical-sand-left.png');
    this.loadImage('side-sand-right', './images/side-sand-right.png');
    this.loadImage('side-sand-left', './images/side-sand-left.png');
    this.loadImage('side-sand-right-top', './images/side-sand-right-top.png');
    this.loadImage('side-sand-left-top', './images/side-sand-left-top.png');
    this.loadImage('bot', './images/bot.png');
    this.loadImage('enemy-gun-left', './images/enemy-gun-left.png');
    this.loadImage('enemy-gun-right', './images/enemy-gun-right.png');
    this.loadImage('character-head', './images/character-head.png');
    this.loadImage('num-of-lives', './images/num-of-lives.png');
    this.loadImage('status', './images/status.png');
    this.loadImage('swap', './images/swap.png');
    this.loadImage('default-gun', './images/default-gun.png');

    this.loadInterval = setInterval(function(){
      if(that.imagesLoaded == checkLoadedAssets(that.images)){
        clearInterval(that.loadInterval);
        new Game(assets);
      }
    },5000);
  }

  this.loadImage  = function(filename, source){
    var image = new Image();
    image.onload = function(){
      that.imagesLoaded +=1;
    }
    image.src = source;
    that.images[filename] = image;
  }

  this.getImage = function(filename){
    return that.images[filename];
  }

  this.getAudio = function(source){
    var audio = new Audio();
    audio.src = source;
    return audio;
  }

  this.init();
}
function checkLoadedAssets(object){
  var num = 0;
  Object.keys(object).forEach(function(element){
    num += 1;
  });
  return num;
}
window.onload = function(){
  assets = new Assets();
}

