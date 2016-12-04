class MenuScreenState extends Phaser.State{
    game: Phaser.Game;
    startButton: Phaser.Button;
    count:number = 0; 
  constructor() {
            super();
        }
            titleScreenImage: Phaser.Sprite;

        preload() {
            this.load.image("title", "assets/images/dog.png");
        }
        create() {
            this.titleScreenImage = this.add.sprite(0, 0, "title");
            this.input.onTap.addOnce(this.titleClicked,this); // <-- that um, this is extremely important
        }
        titleClicked (){
            this.game.state.start("ShopState");
        }
}