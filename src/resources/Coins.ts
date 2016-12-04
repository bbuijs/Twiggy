/// <reference path="../objects/ResourcesObject.ts" />

class Coin extends ResourcesObject{
    text:TextObject;
    game:Phaser.Game;

    constructor(x:number, y:number, amount:number, callback:Function, game:Phaser.Game){
        super(game, x, y, amount, 'coin', callback);
        
        this.game = game;
    }
    
    action(){
        console.log(this.amount);
    }
}