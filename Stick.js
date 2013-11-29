Game.Stick = Game.Item.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    this.strings.name = Game.STRINGS.ITEM_STICK;
    
    this.type = "STICK";
  },
  draw: function(time_d, time){
    var ctx = this.game.ctx;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(5, 0);
    ctx.moveTo(4,0);
    ctx.lineTo(4.5, 0.5);
    ctx.stroke();
  }
});
