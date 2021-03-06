var Game = {};
Game.Game = Listenable.extend({
  init: function(){
    //A object in world mush inhert from Object.js
    this.world = [];
    this.players = [];
    this.settings = {
      seed: 123,
      maxplayers: 1
    },
    this.lasttick = new Date().getTime();
  },
  addObject: function(obj, id){
    if(typeof id=="number"){
      this.world[id]=obj;
    }else{
      this.world.push(obj);
    }
  },
  getId: function(){
    
    return this.world.length;
  },
  eachObject: function(callback){
    for(var i = 0; i < this.world.length; i++){
      
      //Perfomance, don't use for(var ... in ...)
      //But check if actual index exists
      if(typeof this.world[i] == "undefined"){
        numberOfDeadItems++;
        continue;
      }
      var res = callback.call(this, this.world[i], i);
      if(typeof res == "boolean" && res == true){
        break;
      }
    }
  },
  tick: function(time){
    this.eachObject(function(o, i){
      

      if(o._destroy == true){
        o._listen("destroy");
        delete this.world[i];
      }
      this.world[i].tick(time - this.lasttick, time);
    });
    this.lasttick = time;
  },
  //Could be nice to be able to procedually generate world on-the-go
  generateWorld: function(width, height){
    
  }
});
