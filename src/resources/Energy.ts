/// <reference path="../objects/ResourcesObject.ts" />

class Energy extends ResourcesObject{
    constructor(x:number, y:number, amount:number, callback:Function, game:Phaser.Game){
        super(game, x, y, amount, 'energy', callback);
        
        this.game = game;
    }
    
    action(){
        console.log("Sun Clicked");
    }
}