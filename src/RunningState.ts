
class RunningState extends Phaser.State {
    textStyle: Object;
    //resourses
    water: Water;
    sun: Sun;

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

    // levels: Array<>

    constructor() {
        super();

    }

preload(){
		this.menuGroup = new GroupObject(this.game);
		this.game.load.image('water', "assets/images/dog.png");
        this.game.load.image('button', "assets/images/button.png");
        this.game.load.image('sun', "assets/images/sun.png");
        this.game.load.image('coin', "assets/images/sun.png");
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
   
        // var cloud.render();
        //set the tree.
        this.tree = new PearTree(this.game,this.game.width / 2 - 100,0,1);
        this.tree.setSize(400,200);
        this.tree.render();

        // tell Phaser how you want it to handle scaling when you go full screen
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        // and this causes it to actually do it
        this.game.scale.refresh();
        //this lines will build the resourse objects.
        // this.shopButton = new ButtonObject(this.game, this.game.width / 2, 200, "buttonshop", RunningState.prototype.goToShopState);

        this.sun = new Sun(20, 20, 10, Sun.prototype.action, this.game);
        this.sun.setSizes(20, 20);
        this.sun.render();

        this.water = new Water(20, 80, 10, Water.prototype.action, this.game);
        this.water.setSizes(20, 20);
        this.water.render();

        this.coins = new Coin(this.game.width - 200,20,200,Coin.prototype.action,this.game);
        this.coins.setSizes(20,20);
		this.coins.render();

        this.growbutton = new GrowButton(this.game,this.game.width / 2 - 45 ,500,RunningState.prototype.growChecker.bind(this));
        this.growbutton.render();
        console.log(this.growbutton);
        // this.tree.render();

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
        console.log(this.menuGroup);
        //this loop goes every second.
        //and this will upscale the amount of earth, water and sun
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
            console.log(item.x);
            item.x += 5;
        }

    }

    goToShopState() {
        console.log("Yeah right, clicked the button.");
    }

    growTree(){

    }

    toggleMenu() {
        // console.log(this.menuGroup);
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
        this.earth.amount += 10;
        this.water.amount += 10;
        this.sun.amount += 10;
    }

    growChecker(){
        var oldSunNeeded = this.tree.sunNeeded;
        var oldWaterNeeded = this.tree.waterNeeded;
        var oldEarthNeeded = this.tree.earthNeeded;
        console.log(oldSunNeeded);

        if(this.tree.upgrade(this.sun.amount,this.water.amount,this.earth.amount)){
            this.sun.amount = this.sun.amount - oldSunNeeded;
            this.water.amount = this.water.amount - oldWaterNeeded;
            this.earth.amount = this.earth.amount - oldEarthNeeded;

        }else{
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