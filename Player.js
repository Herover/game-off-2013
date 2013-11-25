Game.Player = Game.Listenable.extend({
  init: function(game, id){
    this._super();
    this.id = typeof id=="number"?id:game.getPlayerId();
  }
});