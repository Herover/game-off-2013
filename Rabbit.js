Game.Rabbit = Game.Living.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    
    this.bbox.w = 10;
    this.bbox.h = 5;
    this.bbox.y = -5;
    
    var me = this;
    this.listen("reachmoveto", function(){
      setTimeout(function(){
        me.moveto({x: me.pos.x + Math.random()*200-100,
                   y: me.pos.y + Math.random()*200-100});
        console.log("Rabbit moving to", me.movingto);
      }, Math.random()*5000);
    });
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
