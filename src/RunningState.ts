import Socket = SocketIOClient.Socket;
class RunningState extends Phaser.State {
    textStyle: Object;
    //resourses
    water: Water;
    energy: Energy;

    coin: Coin;
    diamond: number;
    speed: number = 1;

    //buttons
    menubutton: ButtonObject;
    button: ButtonObject;
    button2: ButtonObject;
    button3: ButtonObject;
    // button4: ButtonObject;
    shopButton: ButtonObject;

    // growbutton: GrowButton;

    menuGroup: Phaser.Group; // maakt var van groep phaser..

    curTreeLevel: number = 1;

    clouds: Array<Cloud>;

    userData: UserData;
    startGame: boolean = false;

    startTree: GameSprite;
    seed: Phaser.Sprite;

    tree: Phaser.Sprite;
    growButton: Phaser.Sprite;
    counter:number = 0;


    constructor() {
        super();
    }

    preload() {
        this.menuGroup = new GroupObject(this.game);
        this.game.load.image('water', "assets/images/waterdrop.png");
        this.game.load.image('energy', "assets/images/zon.png");

        this.game.load.image('button', "assets/images/button.png");
        this.game.load.image('coin', "assets/images/coin.png");
        this.game.load.image('button1', "assets/images/sun.png");
        this.game.load.image('button2', "assets/images/sun.png");
        this.game.load.image('button3', "assets/images/sun.png");
        this.game.load.image('shopButton', "assets/images/market.png");
        this.game.load.image('buttontoshop', "assets/images/dog.png");
        this.game.load.image('growbutton', 'assets/images/growbutton.png');
        this.game.load.image('grass2', 'assets/images/Grass_2.png');
        //trees growing.

        //Pear growing.
        this.game.load.image('pear1', 'assets/images/pear/tree-01.png');
        this.game.load.image('pear2', 'assets/images/pear/tree-02.png');
        this.game.load.image('pear3', 'assets/images/pear/tree-03.png');
        this.game.load.image('pear4', 'assets/images/pear/tree-04.png');

        this.game.load.image('cloud', 'assets/images/cloud2.png');
        this.game.load.image('startTree', 'assets/images/startground.png');
        // this.game.load.spritesheet('gb', 'assets/images/growbutton/sprites.png', 30, 43, 3);
        this.game.load.atlasJSONHash('gb', 'assets/images/growbutton/growButton.png', 'assets/images/growbutton/growButton.json');
        this.game.load.atlasJSONHash('appleTreeState1', 'assets/images/trees/apple/appleState1.png', 'assets/images/trees/apple/appleState1.json');
        this.game.load.atlasJSONHash('appleTreeState2', 'assets/images/trees/apple/appleState2.png', 'assets/images/trees/apple/appleState2.json');
        this.game.load.atlasJSONHash('appleTreeState3', 'assets/images/trees/apple/appleState3.png', 'assets/images/trees/apple/appleState3.json');
        this.game.load.atlasJSONHash('appleTreeState4', 'assets/images/trees/apple/appleState4.png', 'assets/images/trees/apple/appleState4.json');
        this.game.load.atlasJSONHash('appleTreeState5', 'assets/images/trees/apple/appleTreeState5.png', 'assets/images/trees/apple/appleTreeState5.json');
        this.game.load.atlasJSONHash('appleTreeState6', 'assets/images/trees/apple/appleTreeState6.png', 'assets/images/trees/apple/appleTreeState6.json');
        this.game.load.atlasJSONHash('appleTreeState7', 'assets/images/trees/apple/appleTreeState7.png', 'assets/images/trees/apple/appleTreeState7.json');

        this.game.load.image('mountain1', 'assets/images/moutain1.png');
        this.game.load.image('mountain2', 'assets/images/mountain2.png');
        this.game.load.image('mountain3', 'assets/images/mountain3.png');
        this.game.load.image('mountain4', 'assets/images/moutain3.png');

        this.game.load.image('dutchmountain', 'assets/images/dutchmountain.png');
        this.game.load.image('grass', 'assets/images/grass1.png');

        this.game.load.image('menuparts-01', 'assets/images/menuparts-01.png');
        this.game.load.image('menuparts-02', 'assets/images/menuparts-02.png');
        this.game.load.image('menuparts-03', 'assets/images/menuparts-03.png');
        this.game.load.image('menuparts-04', 'assets/images/menuparts-04.png');
        this.game.load.image('menuparts-05', 'assets/images/menuparts-05.png');

        this.game.load.image('firstseed', 'assets/images/firstSeed.png');
    
}

    //create background
    createGradient() {
        this.game.stage.backgroundColor = "#FFF";
        let myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        let grd = myBitmap.context.createLinearGradient(0, 0, 0, 500);
        grd.addColorStop(1, "#cbe0f4");
        grd.addColorStop(0, "#0e87ca");
        myBitmap.context.fillStyle = grd;
        myBitmap.context.fillRect(0, 0, this.game.width, this.game.height);

        //load the animation
        let anim = this.game.add.sprite(0, 0, myBitmap);
        anim.alpha = 0;
        this.game.add.tween(anim).to({alpha: 1}, 2000).start();
    }

    loading() {
        //create the user
        let userObject = new UserObject("Ivo", "Kroon", "BLA");
        let plantObject = null;
        let plot = new Plot("1", "First", 1, 1, plantObject);
        // console.log(this.plot.plant_id);
        this.userData = new UserData(0, 0, 0, 0,
            plot,
            userObject
        );
    }

    create() {
        //create a user
        this.loading();
        this.createGradient();
        //load the background
        let dutchMountain = this.game.add.sprite(-3, this.game.height - 300, 'dutchmountain');
        dutchMountain.width = (this.game.width + 3);

        this.game.add.sprite(0, this.game.height - 100, 'mountain2');
        let mountainBack = this.game.add.sprite(-150, this.game.height - 180, 'mountain4');
        mountainBack.width = this.game.width + 300;

        let mountain = this.game.add.sprite(-2, this.game.height - 150, 'mountain1');
        mountain.width = this.game.width + 4;
        this.game.add.sprite(0, 450, 'grass2');

        this.button2 = new ButtonObject(this.game, this.game.width - 40, this.game.height + 20, "menuparts-02", this.button2Click);
        this.button2.setSizes(80, 40);
        this.button2.anchor.set(0.5);
        this.menuGroup.add(this.button2);

        this.button3 = new ButtonObject(this.game, this.game.width - 40, this.game.height + 60, "menuparts-03", this.button3Click);
        this.button3.setSizes(80, 40);
        this.button3.anchor.set(0.5);
        this.menuGroup.add(this.button3);

        this.shopButton = new ButtonObject(this.game, this.game.width - 40, this.game.height + 100, "menuparts-04", this.shopButtonCliced);
        this.shopButton.setSizes(80, 40);
        this.shopButton.anchor.set(0.5);
        this.menuGroup.add(this.shopButton);

        //first button
        this.menubutton = new ButtonObject(this.game, this.game.width - 110, this.game.height - 60, "menuparts-05", this.toggleMenu.bind(this)); // bind zorgt ervoor dat je in de functie nog bij je menugroep item kan.
        this.menubutton.setSizes(100, 50);
        this.menuGroup.add(this.menubutton);  // voeg zo alle knopjes in de array.
        this.game.world.bringToTop(this.menuGroup);

        this.clouds = [
            new Cloud(this.game, 'cloud'),
            new Cloud(this.game, 'cloud'),
            new Cloud(this.game, 'cloud'),
            new Cloud(this.game, 'cloud'),
        ];

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.energy = new Energy(20, 20, Math.floor(this.userData.energy), Energy.prototype.action, this.game);
        this.energy.setSizes(20, 20);
        this.energy.render();

        if (!this.userData.plot.plant) {
            this.seed = this.game.add.sprite(this.game.width / 2 - 10, 200, 'firstseed');
            this.seed.width = 20;
            this.seed.height = 25;
            this.seed.inputEnabled = true;
            this.seed.input.enableDrag();
            this.seed.input.allowHorizontalDrag = false;
            //load the plant
        }

        this.startTree = new GameSprite(this.game,
            this.game.width / 2 - 100,
            this.game.height - 200
            , "startTree");
        this.startTree.width = 200;
        this.startTree.height = 100;
        this.startTree.render();
        if (!this.userData.plot.plant) {
            this.game.physics.enable([this.startTree, this.seed], Phaser.Physics.ARCADE);
        }

        if (this.userData.plot.plant) {
            this.loadNewState();
        }

        // tell Phaser how you want it to handle scaling when you go full screen
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        // and this causes it to actually do it
        this.game.scale.refresh();
        //this lines will build the resourse objects.
        // this.shopButton = new ButtonObject(this.game, this.game.width / 2, 200, "buttonshop", RunningState.prototype.goToShopState);

        

        this.coin = new Coin(this.game.width - 80, 20, 200, Coin.prototype.action, this.game);
        this.coin.setSizes(20, 20);
        this.coin.render();
        this.coin.inputEnabled = true;
        this.coin.events.onInputDown.add(this.clearCookie.bind(this), this);

        var fourth = this.game.width / 4; // een vierde van de game grote
        var eigth = this.game.height / 8; // 1/8
                var barBlack,maxHeight,b1tween;
      barBlack = this.game.add.graphics(15,540); 
      barBlack.beginFill(0x000000);    barBlack.drawRect(0,0,25,50);  
                 maxHeight = -100;    barBlack.height=0;
                      b1tween = this.game.add.tween(barBlack);   
                        b1tween.to({height:maxHeight},10);  
                        b1tween.start();

                        
                        var barYellow,maxHeight,firsttween; 
            barYellow = this.game.add.graphics(15,540);
            barYellow.beginFill(0x1E6665);    barYellow.drawRect(0,0,25,50);  
            maxHeight = -100    ;    barYellow.height= 0; 
            firsttween = this.game.add.tween(barYellow);
                    firsttween.to({height:maxHeight},1000);
                        firsttween.start();
        // this.game.time.events.loop(Phaser.Timer.SECOND, this.loop.bind(this), this);
    }

    clearCookie() {
        localStorage.clear();
    }

    //THIS IS FOR UPDATING THE TREE STATE
    loadNewState() {
        if (this.tree) {
            this.tree.destroy();
        }

        if (!this.growButton) {
            let growButtonHeight = this.game.cache.getImage('gb').height / 1.5;
            let growButtonWidth = this.game.cache.getImage('gb').width / 1.5;

            this.growButton = this.game.add.sprite(
                this.game.width / 2 - growButtonWidth / 2
                , this.game.height - 80
                , 'gb');

            this.growButton.animations.add('growButton');
            this.growButton.animations.play('growButton', 4, true);
            this.growButton.inputEnabled = true;
            this.growButton.events.onInputDown.add(this.growButtonHandler.bind(this), this);
            this.growButton.width = growButtonWidth;
            this.growButton.height = growButtonHeight;
        }
        console.log('loading new state');
        let treeState = 'appleTreeState1';
        let appleTreeWidth = 150;
        let appleTreeHeight = 150;

        switch (this.userData.plot.plant.state_id) {
            case 1:
                treeState = 'appleTreeState1';
                break;
            case 2:
                appleTreeWidth = 200;
                appleTreeHeight = 200;
                treeState = 'appleTreeState2';
                break;
            case 3:
                appleTreeWidth = 250;
                appleTreeHeight = 350;
                treeState = 'appleTreeState3';
                break;
            case 4:
                appleTreeWidth = 250;
                appleTreeHeight = 350;
                treeState = 'appleTreeState4';
                break;
            case 5:
                appleTreeWidth = 250;
                appleTreeHeight = 350;
                treeState = 'appleTreeState5';
                break;
            case 6:
                appleTreeWidth = 250;
                appleTreeHeight = 350;
                treeState = 'appleTreeState6';
                break;
            case 7:
                appleTreeWidth = 300;
                appleTreeHeight = 500;
                treeState = 'appleTreeState7';
                break;

            default:
                treeState = 'appleTreeState1';
        }

        this.tree = this.game.add.sprite(
            this.game.width / 2 - appleTreeWidth / 2
            , this.game.height - appleTreeHeight - 130
            , treeState);

        this.tree.animations.add('tree');
        this.tree.animations.play('tree', 8, true);
        this.tree.inputEnabled = true;
        this.tree.width = appleTreeWidth;
        this.tree.height = appleTreeHeight;
        this.game.world.bringToTop(this.startTree);
    }

    growButtonHandler() {
        console.log(this.userData);

        //check data
        if (this.userData.energy >= 200) {
            if(this.userData.plot.plant.state_id < 7) {
                this.userData.plot.plant.state_id += 1;
                this.userData.energy -= 200;
                var barBlack,maxHeight,b1tween;
      barBlack = this.game.add.graphics(15,540); 
      barBlack.beginFill(0x000000);    barBlack.drawRect(0,0,25,50);  
                 maxHeight = -100;    barBlack.height=0;
                      b1tween = this.game.add.tween(barBlack);   
                        b1tween.to({height:maxHeight},10);  
                        b1tween.start();

                        
                        var barYellow,maxHeight,firsttween; 
            barYellow = this.game.add.graphics(15,540);
            barYellow.beginFill(0x1E6665);    barYellow.drawRect(0,0,25,50);  
            maxHeight = -100    ;    barYellow.height= 0; 
            firsttween = this.game.add.tween(barYellow);
                    firsttween.to({height:maxHeight},1000);
                        firsttween.start();
            }else{
                console.log("Your plant is now max level");
            }
            this.loadNewState();
        }else{
            console.log("Not possible yet");
        }

    }

    update() {
        //do something every second
        //TODO make it every second..... maybe there is an error
        if(this.counter > 30){
            this.userData.energy += 20;

            this.counter = 0;
        }
        //set the new energy
        this.energy.amount = this.userData.energy;
        this.counter ++;

        for (let i = 0; i < this.clouds.length; i++) {
            this.clouds[i].move();
        }
        if (!this.userData.plot.plant) {
            // console.log("There is a plot");
            // }else{
            this.game.physics.arcade.overlap(this.startTree, this.seed, this.collisionHandler, null, this);// this.socket.on('energy', function (data: any) {
        }

    }

    collisionHandler() {
        this.seed.destroy();
        let plantObject = new PlantData("1", "Apple tree", 0, 1, 1);
        this.userData.plot.plant = plantObject;
        //send emit and add the tree
        console.log(this.userData);
        this.loadNewState();
    }

    toggleMenu() {
        if (this.menuGroup.y == 0) {
            let menuTween = this.game.add.tween(this.menuGroup).to({
                y: -130
            }, 400, Phaser.Easing.Bounce.Out, true);
        }
        if (this.menuGroup.y == -130) {
            let menuTween = this.game.add.tween(this.menuGroup).to({
                y: 0
            }, 400, Phaser.Easing.Bounce.Out, true);
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
        this.game.state.start("profileState");
    }

    shopButtonCliced() {
        this.game.state.start("ShopState");
    }
}