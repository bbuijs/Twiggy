class Cloud extends Phaser.Sprite{
    game:Phaser.Game;
    speed:number;
    sizes:Array<number> = [2,1.2,1.5,1.8,2.0, 2.2];
    // yPos = [20,60,100,140];
    image:string;

    constructor(game:Phaser.Game, image:string){
        super(game, (Math.random() * (game.width - 50)) + 50,  Math.random() * (game.height / 2.5) + 1,image);
        this.game = game;
        this.image = image;
        this.speed = (Math.random() / 3) + 0.05;
        this.render();
    }

    render(){
        let randomNumber = Math.floor(Math.random() * this.sizes.length) + 1;
        let size = this.sizes[randomNumber];
        this.width = this.game.cache.getImage(this.image).width / size;
        this.height = this.game.cache.getImage(this.image).height / size;
        this.game.add.existing(this);
    }

    move(){
        if(this.x > this.game.width){
            this.x = -this.width;
        }else{
            this.x += this.speed;
        }
    }

}