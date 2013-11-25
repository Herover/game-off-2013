Game.ContextMenu = Game.ContextPop.extend({
  init: function(game){
    this._super(game);
  },
  draw: function(){
    this._super();
    this.game.ctx.save();
    this.game.ctx.translate(this.pos.x, this.pos.y);
    
    this.game.ctx.fillStyle = "rgba(255,255,255,0.8)";
    this.game.ctx.fillRect(0, 0,  this.size.w, this.fullHeight);
    this.game.ctx.stroke();
    this.game.ctx.fillStyle = "rgba(0,0,0,8)";
    this.game.ctx.font = this.size.h + "px Verdana";
    
    this.game.ctx.beginPath();
    for(var i = 0; i<this.menu.length; i++){
    
      this.game.ctx.rect(
        0, 
        i*this.size.h, 
        this.size.w, 
        this.size.h
      );
      this.game.ctx.fillText(this.menu[i].txt, 0, (i+1)*this.size.h);
      
    }
    this.fullHeight = this.menu.length*this.size.h;

    this.game.ctx.stroke();
    
    this.game.ctx.restore();
  },
  onClick: function(pos){ 
    var i = Math.floor(pos.y/this.size.h);
    this.menu[i].c.call(this, this.menu[i]);
  }
});