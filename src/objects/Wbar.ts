class wBar extends GameSprite{
    keys:Array<string>;

    startAmountWater:number;
    currentLevel:number;
    WaterNeeded:number;

    maxLevel:number;

    constructor(game:Phaser.Game, x:number, y:number, currentLevel:number, keys:Array<string>, maxLevel:number, startWater:number){
        super(game,x,y,keys[currentLevel - 1]);
        this.keys = keys;
        this.startAmountWater = startWater;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel
        this.calcNeeded();
    }
    
    calcNeeded(){
        this.WaterNeeded = this.startAmountWater * (this.currentLevel + 1);
    }

    upgrade(Water:number):boolean{
        console.log("Water " + Water);
        if(this.currentLevel != this.maxLevel){
            if(this.WaterNeeded <= Water){
                this.currentLevel += 1;
                console.log(this.currentLevel);
                this.calcNeeded();
                
                return true;
            }else{
                return false;
            }
        }else{
            console.log("Maxed!");
            return false;
        }
    }
}