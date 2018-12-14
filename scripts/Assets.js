var assets;
function Assets(){
  var that = this;
  this.images = {};
  this.imagesLoaded = 0;
  this.loadInterval;

  this.init = function()
  {
    this.loadImage('sand', './images/sand.png');
    this.loadImage('grass', './images/grass.png');
    this.loadImage('character-sprite-right', './images/character-sprite-right.png');
    this.loadImage('character-sprite-left', './images/character-sprite-left.png');
    this.loadImage('right-hand-with-gun', './images/right-hand-with-gun.png');
    this.loadImage('left-hand-with-gun', './images/left-hand-with-gun.png');
    this.loadInterval = setInterval(function(){
      if(that.imagesLoaded == checkLoadedAssets(that.images)){
        clearInterval(that.loadInterval);
        new Game(assets);
      }
    },2000); 
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

