Game.ContextPop = Listenable.extend({
  init: function(game){
    this._super();
    this.game = game;
    this.menu = [];
    this.pos = {x:0, y:0};
    this.size = {w: 150, h: 25};
    this.fullHeight = 0;
    this.menu = null;
    this.target = null;
  },
  draw: function(){
    this.updatePos();
  },
  onClick: function(pos){ 
    var i = Math.floor(pos.y/this.size.h);
    this.menu[i].c.call(this, this.menu[i]);
  },
  updatePos: function(){
    this.pos.x = this.target.pos.x + this.target.bbox.x + this.target.bbox.w/2;
    this.pos.y = this.target.pos.y + this.target.bbox.y + this.target.bbox.h/2;
  },
  setTarget: function(target){
    this.target = target;
    this.menu = target.getContextMenu();
  }
});