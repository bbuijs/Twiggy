/// <reference path="../objects/ResourcesObject.ts" />

class Earth extends ResourcesObject{

    // _amount:number;
    text:TextObject;
    game:Phaser.Game;

    constructor(x:number, y:number, amount:number, callback:Function, game:Phaser.Game){
        super(game, x, y, amount, 'earth', callback);
        
        this.game = game;
    }
    
    action(){
        console.log(this.amount);
    }
}