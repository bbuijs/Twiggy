/// <reference path="ButtonObject.ts" />

//here are all the functions for the resources.
class ResourcesObject extends ButtonObject{
    text:TextObject;
    _amount:number;
    cookieHandler:CookieHandler;

    constructor(game:Phaser.Game, x:number, y:number, amount:number, key:string, callback:Function){
        super(game,x,y,key,callback);
        this.cookieHandler = new CookieHandler(key);
        this._amount = this.cookieHandler.getInt();

        this.setValue(this.amount);
        this.key = key;
    }


    setValue(amount:number){
        console.log("setting value");
        var x = this.x + 30;
        var y = this.y;
        var amountString = String(amount);
        this.text = new TextObject(this.game, x, y, amountString, 15, "#000000")
    }

    updateValue(amount:number){
        this.cookieHandler.add(amount);
        var amountString = String(amount);
        this.text.setText(amountString);
    }

    get amount():number{
        return this._amount;
    }

    set amount(amount:number){
        this._amount = amount;
        //update the value
        this.updateValue(this._amount)
    }

}