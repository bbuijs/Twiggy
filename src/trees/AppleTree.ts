class AppleTree extends Tree{
    constructor(game:Phaser.Game, x:number, y:number, level:number){
        let keys = ["apple1", "apple2", "apple3", "apple4"];
        let maxLevel = 4;
        let energy = 20;

        super(game,x,y,level, keys,maxLevel,energy);
    }
}