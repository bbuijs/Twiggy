class ButtonObject extends Phaser.Button{
    keyString:string;
    game:Phaser.Game;
    constructor(game:Phaser.Game, x:number, y:number, key:string, callback:Function){
        super(game,x,y,key, callback);
        this.keyString = key;
    }

    setSizes(width:number, height:number){
        this.width = width;
        this.height = height;
        this.game.world.bringToTop(this);
    }

    render(){
        this.game.add.existing(this);
        this.game.world.bringToTop(this)
    }

    action(){}
}