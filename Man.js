Game.Man = Game.Living.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    
    this.bbox = {x: 0, y: -15, w: 10, h: 15}; //Used to find clickables, adds this.pos
    
    this.Strings.name = Game.STRINGS.MAN;
  },
  loadData: function(data){
    this._super(data);
    
  },
  draw: function(time_d, time){
    var ctx = this.game.ctx;
    ctx.moveTo(0,0);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(5, -15);
    ctx.lineTo(10, 0);
    ctx.stroke();
  },
  onWorldClick: function(pos, data){
    this._super(pos, data);
    if(data){
      this.game.contextmenu
    }
    this.movingto.x = pos.x;
    this.movingto.y = pos.y;
    return true;
  }
});
