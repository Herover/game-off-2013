Game.Inventory = Listenable.extend({
  init: function(max){
    this._super();
    this.lists = {};
    this.number = 0;
    this.max = max;
  },
  add: function(item){
    console.log("add");
    if(this._listen("add")){
      if(this.number < this.max){
        if(typeof this.lists[item.type] == "undefined")
          this.lists[item.type] = [];
        this.lists[item.type].push(item);
        this.number++;
        return true;
      }
    }
    return false;
  },
  remove: function(type,i){
    if(typeof type != "string")
      type = type.type;
    if(typeof this.lists[type] == "object"){
      if(typeof i != "number")
        i = this.lists[type].length - 1;
      if(typeof this.lists[type][i] == "object"){
        //Remove item and return it
        this.number--;
        console.log(this.number);
        return this.lists[type].splice([i],1)[0];
      }
    }
    return false;
  }
});