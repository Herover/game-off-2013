Game.Plant = Game.WorldObject.extend({
  init: function(data, game, id){
    this._super(data, game, id);
    
    this.inventory.max = 10;
    
    this.branches = this.mkPlant(3, 0, 4, {x: 0, y: 0, r: 0, l: 40});
  },
  loadData: function(data){
    this._super(data);
    
  },
  mkPlant: function(splits, n, times, last){
  
    var range = Math.PI*2/12;
    
    function sign(a){
      if(a==0)
        return -1;
      if(a<0)
        return -1;
      if(a>0)
        return 1;
    }
    
    var branch = {
      x: last.x + Math.floor(Math.cos(-Math.PI/2 + n*range + last.r)*last.l),
      y: last.y + Math.floor(Math.sin(-Math.PI/2 + n*range + last.r)*last.l),
      a: [],
      r: last.r + range *(n-splits/2+.5) + Math.random()*0.2-0.1,
      l: last.l/(Math.random()+1)
    };
    //branch.r = last.r + range * 
    
    if(times-1 != 0){
      for(var i = 0; i < splits; i++){
        branch.a[i] = this.mkPlant(splits, i, times - 1, branch);
      }
    }
    return branch;
  },
  draw: function(time_d, time){
    var ctx = this.game.ctx;
    
    function drawBranch(branch){
      for(var i = 0; i<branch.a.length; i++){
        ctx.moveTo(branch.x, branch.y);
        ctx.lineTo(branch.a[i].x, branch.a[i].y);
        //if(branch[i])
          drawBranch(branch.a[i]);
      
      }
    }
    
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(this.branches.x,this.branches.y);
    drawBranch(this.branches);
    ctx.stroke();
  },
  tick: function(time_d, time){
    if(time % 8000 < time_d){
      var stick = new Game.Stick({}, this.game);
      this.inventory.add(stick);
    }
  }
});