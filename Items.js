
//NOT IN USE

Game.items = {
  register: function(item){
    if(typeof Game.items.i[item.type] == "undefined"){
       Game.items.i[item.type] = item;
       return true;
    }
    else{
      return false;
    }
  },
  get: function(type){
  
    if(typeof Game.items.i[type] != "undefined"){
      return new Game.items.i[type]();
    }
    return false;
  },
  i:{}
};