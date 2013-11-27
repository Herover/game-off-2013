Game.ClientGame = Game.Game.extend({
  init: function(can, ctx){
    this._super();
    
    this.ctx = ctx;
    this.can = can;
    
    this.mouse = {
      click: {x: 0, y: 0},
      clicktime: 0,
      pos: {x: 0, y: 0},
      down: false
    };
    
    this.selected = false;
    
    this.contextmenu = new Game.ContextMenu(this);
    
    this.viewport = {x: 0, y: 0, move: false, scale: 1, last: {x: 0, y: 0}};
    
    var me = this;
    can.addEventListener("click",          function(e){me.onClick.call(me,e);});
    can.addEventListener("mousedown",      function(e){me.onMouseDown.call(me,e);});
    can.addEventListener("mouseup",        function(e){me.onMouseUp.call(me,e);});
    can.addEventListener("mousemove",      function(e){me.onMouseMove.call(me,e);});
    can.addEventListener("contextmenu",    function(e){me.onClick.call(me,e);});
    can.addEventListener("mousewheel",     function(e){me.onScroll.call(me,e);});
    can.addEventListener("DOMMouseScroll", function(e){me.onScroll.call(me,e);});
    
    can.addEventListener("touchstart",     function(e){me.onTouchStart.call(me,e);});
    can.addEventListener("touchend",       function(e){me.onTouchEnd.call(me,e);});
    can.addEventListener("touchleave",     function(e){me.onTouchEnd.call(me,e);});
    can.addEventListener("touchcancel",    function(e){me.onTouchCancel.call(me,e);});
    can.addEventListener("touchmove",      function(e){me.onTouchMove.call(me,e);});
    
    window.addEventListener("resize",this.resize);
    this.resize();
  },
  draw: function(time){
    ctx.clearRect(0,0,can.width,can.height);
    ctx.save();
    ctx.translate(this.viewport.x, this.viewport.y);
    //ctx.translate(this.viewport[0] + this.viewsize[0]*1/this.scale, this.viewport[1] + this.viewsize[1]*1/this.scale);
    ctx.scale(this.viewport.scale, this.viewport.scale);
    this.eachObject(function(o, i){
      this.ctx.save();
      
      ctx.strokeStyle = "rgb(0,0,0)";
      this.ctx.translate(o.pos.x, o.pos.y);
      o.draw(time - this.lasttick, time);
      
      this.ctx.restore();
    });
	
    //Handle context menu visuals
    if(this.selected){
      this.contextmenu.pos.x = this.selected.pos.x + this.selected.bbox.x + this.selected.bbox.w;
      this.contextmenu.pos.y = this.selected.pos.y;
      
      this.contextmenu.draw();
    }
	
    ctx.restore();
    
    
  },
  //Tages {x: x, y: y} coordinate set 
  //Relative to world (0,0) coords
  getObjectsAt: function(pos){
    var targets = [];
    this.eachObject(function(o,i){
      if(   pos.x > o.pos.x + o.bbox.x
         && pos.y > o.pos.y + o.bbox.y
         && pos.x < o.pos.x + o.bbox.x + o.bbox.w
         && pos.y < o.pos.y + o.bbox.y + o.bbox.h ){
        targets.push(o);
      }
      return false;
    });
    return targets;
  },
  /*
    Turn coords on screnn into coords on canvas.
    Takes care of scroll and offset
  */
  clickToScreenPos: function(e){
    var pos = {x: 0, y: 0};
    if (e.pageX || e.pageY) { 
      pos.x = e.pageX;
      pos.y = e.pageY;
    }
    else { 
      pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 
    pos.x -= this.can.offsetLeft;
    pos.y -= this.can.offsetTop;
    return pos;
  },
  //Convert screen pos to world pos 
  screenToWorldPos: function(pos){
    return {
      x: (pos.x-this.viewport.x)/this.viewport.scale,
      y: (pos.y-this.viewport.y)/this.viewport.scale
    }; 
  },
  setSelected: function(select){
    if(this.selected)
      this.selected.selected = false;
    this.selected = select;
    
    this.contextmenu.setTarget(select);
    this.contextmenu.setMenu(select);

    select.selected = true;
  },
  onMouseDown: function(e){
    e.preventDefault();
    var pos = this.clickToScreenPos(e);
    //target = this.getObjectAt(this.screenToWorldPos(pos));
    this.mouse.click.x = pos.x;
    this.mouse.click.y = pos.y;
    
    this.viewport.last.x = this.viewport.x;
    this.viewport.last.y = this.viewport.y;
    
    this.mouse.down = true;
    this.mouse.clicktime = this.lasttick;
    /*
    this._mousedownpos[0] = e.clientX;
    this._mousedownpos[1] = e.clientY;
    
    this._viewdragpos[0] = this.viewport[0];
    this._viewdragpos[1] = this.viewport[1];

    this._mousedowntime = new Date().getTime();
    this._mousedown = true;*/
  },
  onMouseUp: function(e){
    e.preventDefault();
    
    if(!this.viewport.move){
      //Not in onClick() since we got more control here.
      
      var x = e.clientX,
          y = e.clientY,
          targets,
          pos = this.clickToScreenPos(e),
          worldpos = this.screenToWorldPos(pos),
          hasReacted = false;
      
      if(
        this.contextmenu.active &&
        worldpos.x > this.contextmenu.pos.x &&
        worldpos.y > this.contextmenu.pos.y &&
        worldpos.y < this.contextmenu.pos.y + this.contextmenu.fullHeight &&
        worldpos.x < this.contextmenu.pos.x + this.contextmenu.size.w
      ){
        this.contextmenu.onClick({x: worldpos.x - this.contextmenu.pos.x, y: worldpos.y - this.contextmenu.pos.y});
        hasReacted = true;
        //return false;
      }
      
      if(!hasReacted){
        targets = this.getObjectsAt(worldpos);
        /*
          When clicking on a place with multiple object, prefer the objects with
          a small bbox - also if they are hidden behind a larger object
        */
        var target = false;
        if(targets.length>0){
          target = targets[0];
          for(var i = 1; i < targets.length; i++){
            if(target.bbox.w * target.bbox.h < targets[i].bbox.w * targets[i].bbox.h){
              target = targets[i];
            }
          }
        }
        
        console.log(pos, target, e);
        
        //TODO: clean up
        
        if(e.button == 0){  //Left click
          if(target){       //on a new target
            if(this.selected){
              var res = this.selected.onWorldClick(worldpos, target);
              if(!res)
                this.setSelected(target);
            }
            else
              this.setSelected(target);
            
          }
          else if(this.selected){//no new target, send world position to currently selected
            if(this.selected){
              //onWorldClick must return true if it decides to do something, and not give
              //control to someone else
              if(!this.selected.onWorldClick(worldpos, false)){
                this.selected.selected = false;
                this.selected = false;
                this.contextmenu.destroy();
              }
            }
          }
        }
        if(this.selected && e.button == 2){
          this.selected.selected = false;
          this.selected = false;
          this.contextmenu.destroy();
          //return false;
        }
      }
    }
    
    
    
    this.mouse.down = false;
    this.viewport.move = false;
  },
  onClick: function(e){
    //Fired AFTER onMouseUp()
    e.preventDefault();
    //console.log(e);
  },
  onMouseMove: function(e){
    var pos = this.clickToScreenPos(e);
    this.mouse.pos.x = pos.x;
    this.mouse.pos.y = pos.y;
    
    
    if(
      this.mouse.down && (Math.abs(this.mouse.click.x - this.mouse.pos.x)>10 ||
                          Math.abs(this.mouse.click.y - this.mouse.pos.y>10))
    ){
      this.viewport.move = true;
    }
    if(this.viewport.move == true){
      this.viewport.x = this.viewport.last.x - (this.mouse.click.x - this.mouse.pos.x);
      this.viewport.y = this.viewport.last.y - (this.mouse.click.y - this.mouse.pos.y);
      //console.log(this.viewport);
    }
  /*
    this.mousepos = [e.clientX, e.clientY];

    if(this._mousedown && (Math.abs(this._mousedownpos[0] - this.mousepos[0])>10 || Math.abs(this._mousedownpos[1] - this.mousepos[1])>10)){
      this._viewdrag = true;
    }

    if(this._viewdrag == true){
      this.viewport[0] = this._viewdragpos[0] - (this._mousedownpos[0] - this.mousepos[0]);
      this.viewport[1] = this._viewdragpos[1] - (this._mousedownpos[1] - this.mousepos[1]);
      console.log(this.viewport);
    }*/
  },
  
  onTouchStart: function(e){
    e.preventDefault();
    console.log(e);
  },
  
  
  onScroll: function(e){
    /*e.preventDefault();

    if(e.wheelDelta)
      var delta = e.wheelDelta/120;
    else if(e.detail)
      var delta = e.detail/3;
    else
      return false;//Unsupportet browser :(

    this.viewport.scale+=1/delta;
    console.log(this.viewsize[0]*1/this.viewport.scale);*/
    //this.viewport[0]+=this.viewsize[0]/this.scale*delta
    //console.log(this.scale,delta);
  }, 
  resize: function(e){
    //console.log(e);
    can.width = window.innerWidth;
    can.height = window.innerHeight;

   //this.viewsize = [window.innerWidth,window.innerHeight];
  }
});