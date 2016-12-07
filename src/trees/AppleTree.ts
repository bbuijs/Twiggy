class AppleTree extends Tree{
    constructor(game:Phaser.Game, x:number, y:number, level:number){
        let keys = ["apple1", "apple2", "apple3", "apple4", "apple5", "apple6", "apple7", "apple8"];
        let maxLevel = 8;
        let energy = 5;

        super(game,x,y,level, keys,maxLevel,energy);
    }
}