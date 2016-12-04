/// <reference path="../objects/ButtonObject.ts" />

class GrowButton extends ButtonObject{
    constructor(game:Phaser.Game,x:number,y:number,callback:Function){
        super(game,x,y,"growbutton",callback);
    }

    action(){
        console.log("test");
    }
}