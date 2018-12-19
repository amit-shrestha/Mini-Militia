function Utils(){
  this.getRandomNumber = function(min, max){
    return Math.floor(Math.random()*(max-min)+min);
  }
}
