Game.Rabbit = Game.Living.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    
  },
  loadData: function(data){
    this._super(data);
    
  },
  draw: function(time_d, time){
    var ctx = this.game.ctx;
    ctx.moveTo(0,0);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(5, -5);
    ctx.lineTo(10, 0);
    ctx.stroke();
  }
});
