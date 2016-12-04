// /// <reference path="../objects/Tree.ts" />

class PearTree extends Tree{
    constructor(game:Phaser.Game, x:number, y:number, level:number){
        let keys = ["pear1", "pear2", "pear3", "pear4"];
        let maxLevel = 4;
        let energy = 10;
        super(game, x, y, level, keys, maxLevel, energy);
    }
}