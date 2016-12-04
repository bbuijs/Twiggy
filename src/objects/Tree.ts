class Tree extends GameSprite{
    keys:Array<string>;

    startAmountEnergy:number;
    currentLevel:number;
    energyNeeded:number;

    maxLevel:number;

    constructor(game:Phaser.Game, x:number, y:number, currentLevel:number, keys:Array<string>, maxLevel:number, startEnergy:number){
        super(game,x,y,keys[currentLevel - 1]);
        this.keys = keys;
        this.startAmountEnergy = startEnergy;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel
        this.calcNeeded();
    }
    
    changeKey(){
        var key = this.keys[this.currentLevel - 1];
        this.loadTexture(key,0);
    }

    calcNeeded(){
        this.energyNeeded = this.startAmountEnergy * (this.currentLevel + 1);
    }

    upgrade(energy:number):boolean{
        console.log("Energy " + energy);
        if(this.currentLevel != this.maxLevel){
            if(this.energyNeeded <= energy){
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