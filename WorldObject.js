//Object with a position in the world
Game.WorldObject = Game.Object.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    this.owner_id = data.owner; //ID of player
    
    this.bbox = {x: 0, y: 0, w: 0, h: 0}; //Used to find clickables, adds this.pos
    this.selected = false; //true if clicked and still selected
    
    this.inventory = new Game.Inventory();
    
    this.Strings = {name: Game.STRINGS.NULL};
    
    //this.pos = {x: 0, y: 0};
  },
  loadData: function(data){
    this._super(data);
    this.pos = {x:0,y:0};
    if(typeof data.pos == "object"){
      this.pos.x = data.pos.x||0;
      this.pos.y = data.pos.y||0;
    }
    /*else
      this.pos = {x: 0, y: 0};*/
  },
  tick: function(time_d, time){
    this._super(time_d, time);
  },
  draw: function(time_d, time){
    
  },
  //Override and return true to show context menu when clicked
  onContextMenu: function(c){
    return false;
  },
  getContextMenu: function(){
    return false;
  },
  //onWorld events: fired when something happens in the world
  //eg. object is selected and user click somewhere on the screen
  onWorldClick: function(pos, data){
    return false;
  },
  //User point on a object
  //Return something hinting the user what happens if clicked
  onWorldHover: function(pos, data){
    return false;
  }
});