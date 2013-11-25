Game.House = Game.WorldObject.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    
    this.bbox.x = -15;
    this.bbox.y = -20;
    this.bbox.w = 80;
    this.bbox.h = 70;
    
  },
  draw: function(time_d, time){
    var ctx = this.game.ctx;
    if(this.selected == true)
      ctx.strokeStyle = "rgb(255,0,0)";
    else
      ctx.strokeStyle = "rgb(0,0,0)";
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0, 50);
    ctx.moveTo(50,0);
    ctx.lineTo(50, 50);
    ctx.moveTo(-15,15);
    ctx.lineTo(25, -20);
    ctx.lineTo(65, 15);
    ctx.stroke();
  },
  onContextMenu: function(c){
    console.log(c);
  },
  getContextMenu: function(){
    return [
      {txt: "Første", c: function(a){console.log(this, a);}},
      {txt: "Anden", c: function(a){console.log(this, a);}},
      {txt: "Tredje", c: function(a){console.log(this, a);}}
    ];
  }
});
