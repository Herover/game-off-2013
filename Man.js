Game.Man = Game.Living.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    
    this.bbox = {x: 0, y: -15, w: 10, h: 15}; //Used to find clickables, adds this.pos
    this.inventory.max = 5;
    
    this.strings.name = Game.STRINGS.MAN;
  },
  loadData: function(data){
    this._super(data);
    
  },
  draw: function(time_d, time){
    this._super(time_d, time);
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
      var me = this;
      this.game.contextmenu.setMenu([
        {
          c: function(){
            var items = [], n = 0;
            for(var i in data.inventory.lists){
              var localn = n,
                  locali = i;
              items[n] = {
                c: function(){
                  console.log("item",localn,data.inventory.lists[locali][0].strings.name);
                },
                txt: data.inventory.lists[locali][0].strings.name + ": " + data.inventory.lists[locali].length
              };
            }
            console.log(items);
            me.game.contextmenu.setMenu(
              items
            );
          },
          txt: "Inventory"
        }
      ]);
      this.game.contextmenu.setTarget(data);
    }
    //else{
    this.movingto.x = pos.x;
    this.movingto.y = pos.y;
    //}
    return true;
  },
  onWorldHover: function(pos, data){
    this._super(pos, data);
    if(data instanceof Game.Living && data.id != this.id){
      return {txt: "Attack"};
    }
  }
});
