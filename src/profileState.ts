class profileState extends Phaser.State{
	//resourses
	water:Water; 
	sun:Sun; 
	earth:Earth;
	back:ButtonObject;
	coins:Coin; 
	diamonds:Diamond;

	// menuGroup:Phaser.Group; // maakt var van groep phaser..
	
	// maakt keys item
	cursors: Phaser.CursorKeys;
	x:ButtonObject;

	
	constructor() {
		super();
	}

    preload()
	{
		//loading the resourses
		//load the sprite of the resourses
		this.load.image( 'coin', "assets/images/coin.png" );
		this.load.image( 'char', "assets/images/Char.png" );
		this.load.image( 'diamond', "assets/images/diamond.png" );
this.load.image('x',"assets/images/X.png");
this.load.image('maal',"assets/images/maal.png");
		this.load.image( 'water', "assets/images/coin.png" );
		this.load.image( 'earth', "assets/images/zon.png" );
		this.load.image( 'Level', "assets/images/Charityexample.png" );
		this.load.image( 'charity', "assets/images/Charity_empty.png" );
		this.game.stage.backgroundColor = "#663300";
	}
	
	create()
	{
		
		
		 this.game.add.sprite(60,170,'char')
		 var CharityTitle = new TextObject(this.game,100, 125,"Charity", 20, "#000000")
		CharityTitle.anchor.set(0.5);
		 this.game.add.sprite(70,85,'charity')
		 this.game.add.sprite(240,180,'Level')
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.input.addPointer();
		//Set title of screen
		var profileTitle = new TextObject(this.game,this.game.width / 2, 50,"Profile", 50, "#000000")
		profileTitle.anchor.set(0.5);
		var CharTitle = new TextObject(this.game,120, 255,"Char: Tester", 20, "#000000")
		CharTitle.anchor.set(0.5);
		var LevelTitle = new TextObject(this.game,240, 240,"Level: 1", 20, "#000000")
		LevelTitle.setSizes(5,5);
		LevelTitle.anchor.set(0.5);
		//set coin and diamods
		this.coins = new Coin(this.game.width / 2 - 100, 115, 200,Coin.prototype.action, this.game);
		this.coins.setSizes(20,20);
		this.coins.render();

		this.diamonds = new Diamond(this.game.width / 2 + 50, 115,210,Diamond.prototype.action, this.game);
		this.diamonds.setSizes(20,20);
		this.diamonds.render();

		this.x= new ButtonObject(this.game,300,45, "x", this.xClicked);
        this.x.setSizes(40, 40);
        this.x.anchor.set(0.5);
		this.x.render();
		//set line for decoration
		new Phaser.Rectangle(0, 0,0,0);
		var barBlack,maxWidth,tween; 
		barBlack = this.game.add.graphics(0,90);  
        barBlack.beginFill(0x000000);    barBlack.drawRect(0,0,25,2);
		maxWidth = 360;    barBlack.width=0;   
                   tween = this.game.add.tween(barBlack);   
                    tween.to({width:maxWidth},100);  
                      tween.start();
	
	} 



	locationPointer(){
		
	}
	
	action(){
		// aangeroepen bij elke shop item apple
	}

	//user this for rendering
	render(){
		//
	}
	update(){

		 

	}
profileState.prototype.xClicked = function() {
        this.game.state.start("RunningState");;
    };
}
