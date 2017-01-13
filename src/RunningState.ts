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

    socket: Socket;
    userData: UserData;
    startGame: boolean = false;

    startTree: GameSprite;
    seed: Phaser.Sprite;

    tree:Phaser.Sprite;
    growButton:Phaser.Sprite;


    constructor() {
        super();
    }

    preload() {
        this.menuGroup = new GroupObject(this.game);
        // this.game.load.image('water', "assets/images/waterdrop.png");
        this.game.load.image('energy', "assets/images/light.png");

        this.game.load.image('button', "assets/images/button.png");
        this.game.load.image('coin', "assets/images/coin.png");
        this.game.load.image('button1', "assets/images/sun.png");
        this.game.load.image('button2', "assets/images/sun.png");
        this.game.load.image('button3', "assets/images/sun.png");
        this.game.load.image('shopButton', "assets/images/market.png");
        this.game.load.image('buttontoshop', "assets/images/dog.png");
        this.game.load.image('growbutton', 'assets/images/growbutton.png');
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
        // this.game.load.atlasJSONHash('state4apple', 'assets/images/trees/apple/state4apple.png', 'assets/images/trees/apple/state4apple.json');
        // this.game.load.atlasJSONHash('state4apple', 'assets/images/trees/apple/state4apple.png', 'assets/images/trees/apple/state4apple.json');
        // this.game.load.image('appleTreeState4', 'assets/images/trees/apple/appleState4.png');
        // this.game.load.image('appleTreeState5', 'assets/images/trees/apple/appleState5.png');
        // this.game.load.image('appleTreeState6', 'assets/images/trees/apple/appleState6.png');
        // this.game.load.image('appleTreeState7', 'assets/images/trees/apple/appleState7.png');
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

        this.game.load.image('firstseed', 'assets/images/firstseed.png');
    }

    create() {
        // localStorage.clear();
        this.createGradient();
        this.loadUserData();
        this.game.load.onLoadComplete.add(this.loadCompleted, this);
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

        //naaw no animation we use this
        // this.game.add.sprite(0,0, myBitmap);

        //load the animation
        let anim = this.game.add.sprite(0, 0, myBitmap);
        anim.alpha = 0;
        this.game.add.tween(anim).to({alpha: 1}, 2000).start();
    }


    loadUserData() {
        //check if user has cookie
        //else Go and make that cookie.
        //TODO make cookie on the same page.
        if (localStorage.getItem("code")) {
            //starting sockets
            let code = localStorage.getItem('code');
            this.socket = io('http://localhost:4000/', {query: "code=" + code});
            this.socket.on('connect', RunningState.prototype.loading.bind(this));
        } else {
            //No code found go to login and make one...
            window.location.href = "http://localhost/twiggy/twiggy-frontend/bin/login.html";
        }
    }

    loading() {
        this.socket.on('setup', (data: any) => {
            console.log("Setup");
            console.log(data.plots[0]);

            let userObject = new UserObject("Ivo", "Kroon", "BLA");
            let plot = new Plot(data.plots[0]._id, data.plots[0].title, data.plots[0].location, data.plots[0].region, data.plots[0].plant_id);
            // console.log(this.plot.plant_id);
            this.userData = new UserData(data.resources.energy,
                data.resources.water,
                data.resources.coin,
                data.resources.diamond,
                plot,
                userObject
            );
            console.log(this.userData);
            console.log('done');
            //WHOOEW, the data is loaded
            this.game.load.start();
        });
    }

    //this function fires up when the socket is loaded...
    loadCompleted() {
        console.log('loaded..........................');
        this.createAfterLoad();
        this.socketUpdate();
        this.startGame = true;
    }

    socketUpdate() {
        this.socket.on('user_data', (data: any) => {
            // console.log(this.plot.plant_id);
            this.userData.energy = data.resources.energy;
            this.userData.water = data.resources.water;
            this.userData.coin = data.resources.coin;
            this.userData.diamond = data.resources.diamond;

            this.energy.amount = Math.floor(this.userData.energy);
            this.water.amount = Math.floor(this.userData.water);
            this.coin.amount = Math.floor(this.userData.coin);
            this.diamond = Math.floor(this.userData.diamond);
        });
    }

    //after the data of the socket is loaded load the other stuff in...
    createAfterLoad() {
        //load the background
        let dutchMountain = this.game.add.sprite(-3,this.game.height - 300, 'dutchmountain');
        dutchMountain.width = (this.game.width +3) / 2;

        this.game.add.sprite(0,this.game.height - 100, 'mountain2');
        let mountainBack = this.game.add.sprite(-150,this.game.height - 180,'mountain4');
        mountainBack.width = this.game.width + 300;

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
    
                      
                    
        // let grass = this.game.add.sprite(0,this.game.height - 150, 'grass');
        // grass.width = this.game.width / 2;

        // //put buttons on top
        // this.button = new ButtonObject(this.game, this.game.width - 40, this.game.height + 40, "menuparts-01", this.button1Click); // nieuw button object die nog nergens staat maar button1 als plaatje gebruikt en button1click fnctie uitvoert op click.
        // this.button.setSizes(80, 40); // zet knop grote 1 4e breed en 1 8e hoog
        // this.button.anchor.set(0.5);

        // this.menuGroup.add(this.button);

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
        this.menubutton = new ButtonObject(this.game, this.game.width - 110 , this.game.height - 60, "menuparts-05", this.toggleMenu.bind(this)); // bind zorgt ervoor dat je in de functie nog bij je menugroep item kan.
        this.menubutton.setSizes(100,50);
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
        this.energy.setSizes(15, 20);
        this.energy.render();

        //load appleTree sprite and put it in position
        let treeState = 'appleTreeState1';
        console.log(this.userData.plot);
        //if there is a plant in the plot show the plant and the upgrade button.
            // let growButtonHeight = this.game.cache.getImage('gb').height / 1.5;
            // let growButtonWidth = this.game.cache.getImage('gb').width / 1.5;
            // this.growButton = this.game.add.sprite(
            //     this.game.width / 2 - growButtonWidth / 2
            //     , this.game.height - 70
            //     , 'gb');
            //
            // this.growButton.animations.add('growButton');
            // this.growButton.animations.play('growButton', 4, true);
            // this.growButton.inputEnabled = true;
            // this.growButton.events.onInputDown.add(this.growButtonHandler.bind(this), this);
            // this.growButton.width = growButtonWidth;
            // this.growButton.height = growButtonHeight;
            // let appleTreeWidth = 200;
            // let appleTreeHeight = 200;
            //
            // switch (this.userData.plot.plant.state_id) {
            //     case 1:
            //         treeState = 'appleTreeState1';
            //         break;
            //     case 2:
            //         treeState = 'appleTreeState2';
            //         break;
            //     case 3:
            //         treeState = 'appleTreeState3';
            //         break;
            //     case 4:
            //         treeState = 'appleTreeState4';
            //         appleTreeHeight = 400;
            //         appleTreeWidth = 200;
            //         break;
            //     case 5:
            //         treeState = 'appleTreeState5';
            //         break;
            //     case 6:
            //         treeState = 'appleTreeState6';
            //         break;
            //
            //     default:
            //         treeState = 'appleTreeState1';
            // }
            //
            // // let appleTreeWidth = this.game.cache.getImage(treeState).width / 4;
            // // let appleTreeHeight = this.game.cache.getImage(treeState).height / 4;
            //
            // this.tree = this.game.add.sprite(
            //     this.game.width / 2 - appleTreeWidth / 2
            //     , this.game.height - 300
            //     , treeState);
            //
            // this.tree.animations.add('tree');
            // this.tree.animations.play('tree', 8, true);
            // this.tree.inputEnabled = true;
            // // this.tree.events.onInputDown.add(this.growButtonHandler.bind(this), this);
            // this.tree.width = appleTreeWidth;
            // this.tree.height = appleTreeHeight;

        console.log("load plant");
        console.log(this.userData.plot);

        if (this.userData.plot.plant) {
        } else {
            //TODO show seed to plant.
            console.log('load water');
            // let seed = new GameSprite(this.game,200,200,"water");
            this.seed = this.game.add.sprite(this.game.width / 2 - 10, 200, 'firstseed');
            this.seed.width = 20;
            this.seed.height = 25;
            this.seed.inputEnabled = true;
            this.seed.input.enableDrag();
            this.seed.input.allowHorizontalDrag = false;

            // this.startTree = new GameSprite(this.game,
            //     this.game.width / 2 - this.game.cache.getImage("startTree").width / 2,
            //     this.game.height - this.game.cache.getImage("startTree").height - 50
            //     , "startTree");
            // this.startTree.render();
            // this.game.physics.enable([this.startTree, this.seed], Phaser.Physics.ARCADE);
        }

        this.startTree = new GameSprite(this.game,
            this.game.width / 2 - 100,
            this.game.height - 200
            , "startTree");
        this.startTree.width = 200;
        this.startTree.height = 100;
        this.startTree.render();
        if(!this.userData.plot.plant){
            this.game.physics.enable([this.startTree, this.seed], Phaser.Physics.ARCADE);
        }

        if(this.userData.plot.plant) {
            this.loadNewState();
        }

        // tell Phaser how you want it to handle scaling when you go full screen
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        // and this causes it to actually do it
        this.game.scale.refresh();
        //this lines will build the resourse objects.
        // this.shopButton = new ButtonObject(this.game, this.game.width / 2, 200, "buttonshop", RunningState.prototype.goToShopState);

        this.water = new Water(20, 80, Math.floor(this.userData.water), Water.prototype.action, this.game);
        this.water.setSizes(20, 20);
        this.water.render();

        this.coin = new Coin(this.game.width - 200, 20, 200, Coin.prototype.action, this.game);
        this.coin.setSizes(20, 20);
        this.coin.render();
        this.coin.inputEnabled = true;
        this.coin.events.onInputDown.add(this.clearCookie.bind(this), this);

        var fourth = this.game.width / 4; // een vierde van de game grote
        var eigth = this.game.height / 8; // 1/8


        // this.game.time.events.loop(Phaser.Timer.SECOND, this.loop.bind(this), this);
    }

    clearCookie(){
        localStorage.clear();
    }

    loadNewState() {
        if(this.tree) {
            this.tree.destroy();
        }

        if(!this.growButton){
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
        var appleTreeWidth = 150;
        var appleTreeHeight = 150;

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

        // let appleTreeWidth = this.game.cache.getImage(treeState).width / 4;
        // let appleTreeHeight = this.game.cache.getImage(treeState).height / 4;

        this.tree= this.game.add.sprite(
            this.game.width / 2 - appleTreeWidth / 2
            , this.game.height - appleTreeHeight - 130
            ,treeState);

        this.tree.animations.add('tree');
        this.tree.animations.play('tree', 8, true);
        // this.tree.anchor.y = 0;
        this.tree.inputEnabled = true;
        // this.tree.events.onInputDown.add(this.growButtonHandler.bind(this), this);
        this.tree.width = appleTreeWidth;
        this.tree.height = appleTreeHeight;
        this.game.world.bringToTop(this.startTree);
    }

    growButtonHandler() {
        console.log(this.userData.plot.plant);
        console.log('clicked');
        this.socket.emit('growButtonClick', {treeId: this.userData.plot.plant._id}, (data: any) => {
            console.log(data);
            if(data) {
                this.userData.plot.plant.state_id = data.plant.state_id._id;
                console.log('Plant data');
                console.log(data);
                this.loadNewState();
                var barBlack,maxHeight,b2tween;
                      barBlack = this.game.add.graphics(15,540); 
                     barBlack.beginFill(0x000000);    barBlack.drawRect(0,0,25,50);  
                           maxHeight = -100;    barBlack.height=0;
                            b2tween = this.game.add.tween(barBlack);   
                                 b2tween.to({height:maxHeight},10); 
                                 b2tween.start();
                 var barYellow,maxHeight,firsttween; 
                     barYellow = this.game.add.graphics(15,540);
                    barYellow.beginFill(0x1E6665);    barYellow.drawRect(0,0,25,50);  
                        maxHeight = -100    ;    barYellow.height= 0; 
                            firsttween = this.game.add.tween(barYellow);
                                 firsttween.to({height:maxHeight},1000);
                                     firsttween.start ();
            }else{
                // console.log("Error ")
                alert('Niet genoeg energie spaar nog even door.');
            }
        })
    }

    update() {

        if (this.startGame) {
            //start the game after loading...
            for (let i = 0; i < this.clouds.length; i++) {
                this.clouds[i].move();
            }
            if (!this.userData.plot.plant) {
                // console.log("There is a plot");
                // }else{
                this.game.physics.arcade.overlap(this.startTree, this.seed, this.collisionHandler, null, this);// this.socket.on('energy', function (data: any) {
            }

        }
    }

    collisionHandler() {
        this.seed.destroy();
        //send emit and add the tree
        console.log(this.userData);
        this.socket.emit('plantTree', {plotId: this.userData.plot.id, species_id: 1}, (data: any) => {
            console.log("collision data");
            console.log(data.plant_id);
            console.log(this.userData);
            this.userData.plot.plant = data.plant_id;
            this.seed.destroy();
            this.loadNewState();
            // this.growbutton.render();
        });
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