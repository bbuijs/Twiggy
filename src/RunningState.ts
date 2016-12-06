
class RunningState extends Phaser.State {
    textStyle: Object;
    //resourses
    waterResource: Water;
    energyResource: Energy;

    coins: Coin;
    diamonds: number;
    speed: number = 1;

    //buttons
    menubutton: ButtonObject;
    button: ButtonObject;
    button2: ButtonObject;
    button3: ButtonObject;
    // button4: ButtonObject;
    shopButton: ButtonObject;

    growbutton:GrowButton;
    menuGroup: Phaser.Group; // maakt var van groep phaser..

    curTreeLevel:number = 1;
    tree:Tree;

    cloud:Array<GameSprite>;
    gameWorld:GameSprite;
    test:string;

    constructor() {
        super();

    }

preload(){
		this.menuGroup = new GroupObject(this.game);
		this.game.load.image('water', "assets/images/waterdrop.png");
        this.game.load.image('energy', "assets/images/energy.png");

        this.game.load.image('button', "assets/images/button.png");
        this.game.load.image('coin', "assets/images/coin.png");
        this.game.load.image('button1', "assets/images/sun.png");
        this.game.load.image('button2', "assets/images/sun.png");
        this.game.load.image('button3', "assets/images/sun.png");
        this.game.load.image('shopButton', "assets/images/market.png");
        this.game.load.image('buttontoshop', "assets/images/dog.png");
        this.game.load.image('growbutton', 'assets/images/growbutton.png');
        //trees growing.
        this.game.load.image('apple1', 'assets/images/apple/tree-01.png');
        this.game.load.image('apple2', 'assets/images/apple/tree-02.png');
        this.game.load.image('apple3', 'assets/images/apple/tree-03.png');
        this.game.load.image('apple4', 'assets/images/apple/tree-04.png');
        //Pear growing.
        this.game.load.image('pear1', 'assets/images/pear/tree-01.png');
        this.game.load.image('pear2', 'assets/images/pear/tree-02.png');
        this.game.load.image('pear3', 'assets/images/pear/tree-03.png');
        this.game.load.image('pear4', 'assets/images/pear/tree-04.png');

        this.game.load.image('cloud', 'assets/images/cloud.png');

        this.game.load.image('world', 'assets/images/world.png');
        
	}

    create() {
        //first we set the background
        this.game.stage.backgroundColor = "#0000FF";
        this.cloud = [
            new GameSprite(this.game,0,200,"cloud"),
            new GameSprite(this.game,200,240,"cloud"),
            new GameSprite(this.game,500,100,"cloud"),
            ]
        for(var item of this.cloud){
            item.setSize(80,80);
            item.render();
        }

        this.gameWorld = new GameSprite(this.game, 0, this.game.height - 600, "world");
        this.gameWorld.setSize(600,this.game.width);
        this.gameWorld.render();
   
        // var cloud.render();
        //set the tree.
        this.tree = new PearTree(this.game,this.game.width / 2 - 100,this.game.height - 460,1);
        this.tree.setSize(400,200);
        this.tree.render();

        // tell Phaser how you want it to handle scaling when you go full screen
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        // and this causes it to actually do it
        this.game.scale.refresh();
        //this lines will build the resourse objects.
        // this.shopButton = new ButtonObject(this.game, this.game.width / 2, 200, "buttonshop", RunningState.prototype.goToShopState);

        this.energyResource = new Energy(20, 20, 10, Energy.prototype.action, this.game);
        this.energyResource.setSizes(20, 20);
        this.energyResource.render();

        this.waterResource = new Water(20, 80, 10, Water.prototype.action, this.game);
        this.waterResource.setSizes(20, 20);
        this.waterResource.render();

        this.coins = new Coin(this.game.width - 200,20,200,Coin.prototype.action,this.game);
        this.coins.setSizes(20,20);
		this.coins.render();

        this.growbutton = new GrowButton(this.game,this.game.width / 2 - 45 ,this.game.height - 50,RunningState.prototype.growChecker.bind(this));
        this.growbutton.render();

        this.menubutton = new ButtonObject(this.game, this.game.width - 30, this.game.height - 30, "button", this.toggleMenu.bind(this)) // bind zorgt ervoor dat je in de functie nog bij je menugroep item kan.
        this.menubutton.anchor.set(0.5);
        this.menuGroup.add(this.menubutton);  // voeg zo alle knopjes in de array.

        var fourth = this.game.width / 4; // een vierde van de game grote
        var eigth = this.game.height / 8; // 1/8
        this.button = new ButtonObject(this.game, this.game.width - 30, this.game.height + 50, "button1", this.button1Click); // nieuw button object die nog nergens staat maar button1 als plaatje gebruikt en button1click fnctie uitvoert op click.
        this.button.setSizes(50, 50); // zet knop grote 1 4e breed en 1 8e hoog
        this.button.anchor.set(0.5);

        this.menuGroup.add(this.button);

        this.button2 = new ButtonObject(this.game, this.game.width - 30, this.game.height + 100, "button2", this.button2Click);
        this.button2.setSizes(50, 50);
        this.button2.anchor.set(0.5);
        this.menuGroup.add(this.button2);

        this.button3 = new ButtonObject(this.game, this.game.width - 30, this.game.height + 150, "button3", this.button3Click);
        this.button3.setSizes(50, 50);
        this.button3.anchor.set(0.5);
        this.menuGroup.add(this.button3);

        this.shopButton = new ButtonObject(this.game, this.game.width - 30, this.game.height + 200, "shopButton", this.shopButtonCliced);
        this.shopButton.setSizes(50, 50);
        this.shopButton.anchor.set(0.5);
        this.menuGroup.add(this.shopButton);

        //this loop goes every second.
        //and this will upscale the amount of water and energy
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateValues.bind(this), this);
    }

    update(){
        this.moveCloud();
    }

    moveCloud(){
        for(var item of this.cloud){
            if(item.x > this.game.width + 50){
                item.x = 0 - item.width;
            }
            item.x += 5;
        }

    }

    toggleMenu() {
        if (this.menuGroup.y == 0) {
            var menuTween = this.game.add.tween(this.menuGroup).to({
                y: -250
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
        if (this.menuGroup.y == -250) {
            var menuTween = this.game.add.tween(this.menuGroup).to({
                y: 0
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
    }

    updateValues() {
        this.waterResource.amount += 10;
        this.energyResource.amount += 10;
    }

    growChecker(){
        var oldEnergyNeeded = this.tree.energyNeeded;

        if(this.tree.upgrade(this.energyResource.amount)){
            this.energyResource.amount = this.energyResource.amount - oldEnergyNeeded;
        }else{
            //TODO show clean messages
            console.log("Not enough!")
        }
    }

    button1Click() {
        this.game.stage.backgroundColor = "#ff0000";
        // stage change naar menu state. nieuw .ts bestand. shop. opt. ect.
    }

    button2Click() {
        this.game.stage.backgroundColor = "#21ff00";
    }

    button3Click() {
        this.game.stage.backgroundColor = "#0043ff";
    }

    shopButtonCliced() {
        this.game.state.start("ShopState");
    }

    //user this for rendering
    render() {
        //
    }
}