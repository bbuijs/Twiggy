/// <reference path="../objects/ResourcesObject.ts" />

class Water extends ResourcesObject{

    // amount:number;
    text:TextObject;
    game:Phaser.Game;

    constructor(x:number, y:number, amount:number, callback:Function, game:Phaser.Game){
        let keys = ["wBar1","wBar2","wBar3","wBar4"]
        super(game, x, y, amount, 'water', callback);
        let maxLevel = 10;
        this.game = game;
    }
    
    action(){
        console.log("Water Clicked");
    }
}