/// <reference path="objects/GameSprite.ts" />

class Tree extends GameSprite{
    keys:Array<string>;

    startAmountSun:number;
    startAmountWater:number;
    startAmountEarth:number;

    currentLevel:number;

    sunNeeded:number;
    waterNeeded:number;
    earthNeeded:number;

    maxLevel:number;

    constructor(game:Phaser.Game, x:number, y:number, currentLevel:number, keys:Array<string>, maxLevel:number, startSun:number, startWater:number, startEarth:number){
        super(game,x,y,keys[currentLevel - 1]);
        this.keys = keys;
        this.startAmountSun = startSun;
        this.startAmountWater = startWater;
        this.startAmountEarth = startEarth;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel
        this.calcNeeded();
    }
    
    changeKey(){
        var key = this.keys[this.currentLevel - 1];
        this.loadTexture(key,0);
    }

    calcNeeded(){
        this.sunNeeded = this.startAmountSun * (this.currentLevel + 1);
        this.waterNeeded = this.startAmountWater * (this.currentLevel + 1);
        this.earthNeeded = this.startAmountEarth * (this.currentLevel + 1);
    }

    upgrade(sun:number, water:number, earth:number):boolean{
        console.log("sun " + sun + "water " + water + "earth " + earth);
        if(this.currentLevel != this.maxLevel){
            if(this.sunNeeded <= sun && this.waterNeeded <= water && this.earthNeeded <= earth){
                this.currentLevel += 1;
                console.log(this.currentLevel);
                this.calcNeeded();
                this.changeKey();

                return true;
            }else{
                return false;
            }
        }else{
            console.log("You Have reached max level!");
            return false;
        }
    }
}