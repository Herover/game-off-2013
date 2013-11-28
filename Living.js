Game.Living = Game.WorldObject.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    
    this.goto = null;
    
    this.movingtoreached = false;
    
  },
  loadData: function(data){
    this._super(data);
    console.log(this.pos);
    if(typeof data.movingto == "object"){
      this.movingto.x = data.movingto.x||this.pos.x;
      this.movingto.y = data.movingto.y||this.pos.y;
    }
    else
      this.movingto = {x: this.pos.x, y: this.pos.y};
    this.movespeed = data.movespeed||0.05;
  },
  moveto: function(pos){
    this.movingto.x = pos.x;
    this.movingto.y = pos.y;
    this.movingtoreached = false;
  },
  tick: function(time_d, time){
    this._super(time_d, time);
    
    var tx = this.movingto.x - this.pos.x,
      ty = this.movingto.y - this.pos.y,
      dist = Math.sqrt(tx*tx+ty*ty);
    if(dist>this.movespeed+1){  //+1 to make it work
      this.pos.x += (tx/dist)*this.movespeed*time_d;
      this.pos.y += (ty/dist)*this.movespeed*time_d;
    }
    else{
      if(!this.movingtoreached){
        this.pos.x = this.movingto.x;
        this.pos.y = this.movingto.y;
        this.movingtoreached = true;
        this._listen("reachmoveto", null);
      }
    }
  },
});