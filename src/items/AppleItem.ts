/// <reference path="./ItemObject.ts" />

class AppleItem extends ItemObject{
    constructor(game:Phaser.Game, x:number, y:number, callback:Function){
        let name = "Apple";
        let desc = "This is an apple";
        super(name,desc,game,x,y,"apple",callback);
    }

    action(){
        console.log("Check money");
        console.log("Plus one Applle");
    }
    
}