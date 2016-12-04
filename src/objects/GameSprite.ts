

class GameSprite extends Phaser.Sprite{
    x:number;
    y:number;
    keyString:string;
    game:Phaser.Game;

    constructor(game:Phaser.Game, x:number, y:number, key:string){
        super(game, x, y, key);
        this.keyString = key;
        this.x = x;
        this.y = y;   
        this.game = game;
    }

    setSize(height:number, width:number){
        this.height = height;
        this.width = width;
    }
    render(){
        this.game.add.existing(this);
    }
}