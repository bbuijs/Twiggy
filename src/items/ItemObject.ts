/// <reference path="../objects/ButtonObject.ts" />

class ItemObject extends ButtonObject{
    name:string;
    desc:string;
    
    constructor(name:string, desc:string, game:Phaser.Game, x:number, y:number, key:string, callback:Function){
        super(game,x,y,key,callback);
        this.name = name;
        this.desc = desc;
    }
}