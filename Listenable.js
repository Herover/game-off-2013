Listenable = Class.extend({
  init: function(){
    this.callbacks = [];
  },
  listen: function(type, callback){
    if(typeof this.callbacks[type]=="undefined"){
      this.callbacks[type]=[];
    }
    this.callbacks[type].push(callback);
  },
  //Run all calbacks, if 1 returns false, return false here too
  _listen: function(type,arg){
    var status = true;
    if(typeof this.callbacks[type]=="undefined"){
      return true;}
    for(var i in this.callbacks[type]){
      if(typeof this.callbacks[type][i]=="function"){
        if(this.callbacks[type][i].call(this,arg) === false){
          status = false;
        }
      }
    }
    return status;
  }
});