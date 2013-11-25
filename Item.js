Game.Item = Game.Object.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    
    this.Strings = {name: "null"};
    
    this.type = "NULL";
  },
  use: function(user){
    return true;
  }
});
