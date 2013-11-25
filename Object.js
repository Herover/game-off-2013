Game.Object = Listenable.extend({
  init: function(data, game, id){
    this._super();
    this.game = game;
    this.id = typeof id=="number"?id:game.getId();
    
    this.data = {};
    this.loadData(data);
  },
  tick: function(time_d, time){
    
  },
  draw: function(){
    
  },
  //Sanitize data from unknown source
  loadData: function(data){
    //console.info("loadDate","Object");
    return this.data;
  }
});