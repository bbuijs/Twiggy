class ShopState extends Phaser.State{
	//resourses
	water:Water;

	coins:Coin; 
	diamonds:Diamond;

	// menuGroup:Phaser.Group; // maakt var van groep phaser..
	itemArray:Array<ItemObject>;
	// maakt keys item
	cursors: Phaser.CursorKeys;
	verkoop:ButtonObject;
	verkoop1:ButtonObject;
	verkoop2:ButtonObject
	x:ButtonObject;
	rowcount: number = 0; // houd bij welke rij je zit / hoeveel er dus zijn
	placement: number = 0; // houd bij bij welk item in de rij je zit.
	scrollHeight: number; // berekend hoogte van scrollen max.
	fromHeight: number; // hoogte in Y van laatst ondekte input.

	
	constructor() {
		super();
	}

    preload()
	{
		this.load.image("apple", "assets/images/apple.png");
		// this.load.image("apple", "assets/images/apple.png");
		

		//loading the resourses
		//load the sprite of the resourses
		this.load.image( 'coin', "assets/images/coin.png" );
		this.load.image( 'diamond', "assets/images/diamond.png" );
		this.load.image('x',"assets/images/X.png");
		this.load.image('maal',"assets/images/maal.png");
		this.load.image( 'water', "assets/images/coin.png" );
		this.load.image( 'earth', "assets/images/zon.png" );
		this.load.image( 'verkoop', "assets/images/verkoopbutton.png" );
		this.game.stage.backgroundColor = "#663300";
		this.load.image( 'peer', "assets/images/Pear.png" );
		this.load.image( 'banana', "assets/images/banana.png" );
	}
	
	create()
	{
		//inputs
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.input.addPointer();
		//Set title of screen
		var shopTitle = new TextObject(this.game,this.game.width / 2, 50,"Shop", 50, "#000000")
		shopTitle.anchor.set(0.5);
		var sdifTitle = new TextObject(this.game,180, 153,"X", 30, "#000000");
		sdifTitle.anchor.set(0.5);
		var sdifTitle = new TextObject(this.game,180, 333,"X", 30, "#000000");
		sdifTitle.anchor.set(0.5);

		var sdifTitle = new TextObject(this.game,180, 243,"X", 30, "#000000");
		sdifTitle.anchor.set(0.5);

		//set coin and diamods
		var coinvalue = 200;
		this.coins = new Coin(this.game.width / 2 - 100, 85, coinvalue,Coin.prototype.action, this.game);
		this.coins.setSizes(17,20);
		this.coins.render();

		var diamondvalue = 210;
		this.diamonds = new Diamond(this.game.width / 2 + 50, 85,diamondvalue,Diamond.prototype.action, this.game);
		this.diamonds.setSizes(20,20);
		this.diamonds.render();

		 this.verkoop = new ButtonObject(this.game,280,150, "verkoop", this.verkoopClicked);
        this.verkoop.setSizes(100, 50);
        this.verkoop.anchor.set(0.5);
		this.verkoop.render();

		this.verkoop = new ButtonObject(this.game,280,240, "verkoop", this.verkoop1Clicked);
        this.verkoop.setSizes(100, 50);
        this.verkoop.anchor.set(0.5);
		this.verkoop.render();
		this.verkoop = new ButtonObject(this.game,280,330, "verkoop", this.verkoop2Clicked);
        this.verkoop.setSizes(100, 50);
        this.verkoop.anchor.set(0.5);
		this.verkoop.render();
		this.x= new ButtonObject(this.game,300,45, "x", this.xClick);
        this.x.setSizes(40, 40);
        this.x.anchor.set(0.5);
		this.x.render();
		this.game.add.sprite(40,115,'apple');
		this.game.add.sprite(40,200,'peer');
		this.game.add.sprite(40,285,'banana');
		//set line for decoration
new Phaser.Rectangle(0, 0,0,0);
		var barBlack,maxWidth,tween; 
		barBlack = this.game.add.graphics(0,115);  
        barBlack.beginFill(0x000000);    barBlack.drawRect(0,0,25,2);
		maxWidth = 360;    barBlack.width=0;   
                   tween = this.game.add.tween(barBlack);   
                    tween.to({width:maxWidth},100);  
                      tween.start();
					  
		//set the list of items in list
	this.scrollHeight = this.rowcount * 100 + 250;
		this.game.world.setBounds(0, 0, 320 * this.game.width, this.scrollHeight);
		this.game.input.onDown.add(this.locationPointer, this);
		var item = 1;
		var pear = 0; 
		var banana = 0;
		var ItemTitle = new TextObject(this.game,150, 153,item, 40, "#000000");
		var pearprize = new TextObject(this.game,140, 218,pear, 40, "#000000");
		var bananaprize = new TextObject(this.game,140, 305,banana, 40, "#000000");
		ItemTitle.anchor.set(0.5);
	} 
xClick = function() {
        this.game.state.start("RunningState");
    };
	verkoopClicked = function() {
        if(this.item>0){
			this.item = this.item-1;
			this.Coin = this.coinvalue + 100;
			this.item.render();
			this.Coin.render();
	};};
		verkoop1Clicked = function() {
        if(this.pear>0){
			this.pear - 1;
			this.Coin + 100;
			this.pear.render();
			this.Coin.render();
		};};
		verkoop2Clicked = function() {
        if(this.banana>0){
			this.banana - 1;
			this.Coin + 100;
			this.banana.render();
			this.Coin.render();
		};};
	locationPointer(){
		this.fromHeight = this.game.input.activePointer.y;
		console.log(this.fromHeight);
	}

	action(){
		// aangeroepen bij elke shop item apple
	}

	//user this for rendering
	render(){
		//
	}
	update(){

		  if (this.cursors.up.isDown)
			{
				this.game.camera.y -= 10;
			}
			else if (this.cursors.down.isDown)
			{
				this.game.camera.y += 10;
			}
			else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
				this.game.camera.y -= 50;
				this.game.input.mouse.wheelDelta = null;
			} 
			else if(this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN) {
				this.game.camera.y += 50;
				this.game.input.mouse.wheelDelta = null;
			}

			if (this.game.input.activePointer.isDown)
			{
				if (this.game.input.y > this.fromHeight)
					{
						this.game.camera.y += 15;
					}
				else if  (this.game.input.y < this.fromHeight)
					{
						this.game.camera.y -= 15;	
					}
			}
	

}}
