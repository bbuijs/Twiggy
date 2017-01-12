class ShopState extends Phaser.State{
	//resourses
	water:Water; 
	sun:Sun; 
	earth:Earth;

	coins:Coin; 
	diamonds:Diamond;

	// menuGroup:Phaser.Group; // maakt var van groep phaser..
	itemArray:Array<ItemObject>;
	// maakt keys item
	cursors: Phaser.CursorKeys;

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
	}
	
	create()
	{
		
		// this.game.add.sprite(300, 20, 'x');
		this.game.add.sprite(260,130,'verkoop')
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.input.addPointer();
		//Set title of screen
		var shopTitle = new TextObject(this.game,this.game.width / 2, 50,"Shop", 50, "#000000")
		shopTitle.anchor.set(0.5);
		var sdifTitle = new TextObject(this.game,150, 150,"0 X", 40, "#000000")
		sdifTitle.anchor.set(0.5);
		//set coin and diamods
		this.coins = new Coin(this.game.width / 2 - 100, 90, 200,Coin.prototype.action, this.game);
		this.coins.setSizes(20,20);
		this.coins.render();

		this.diamonds = new Diamond(this.game.width / 2 + 50, 90,210,Diamond.prototype.action, this.game);
		this.diamonds.setSizes(20,20);
		this.diamonds.render();

	    this.button3 = new ButtonObject(this.game,50,150, "x", this.button3Click);
        this.button3.setSizes(100, 90);
        this.button3.anchor.set(0.5);
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
		this.itemArray = [		]
		for(let i=0; i < 1; i++) 	{
				this.itemArray.push(new AppleItem(this.game,0,40, ShopState.prototype.action));
		}
	
		for(var item of this.itemArray){
			item.x = this.placement * 100;
			item.y = this.rowcount * 100 + 120;
			item.setSizes(50,50);
			item.render();
			this.placement ++;
			if (this.placement == 6 )
			{
				this.rowcount++;
				this.placement = 0;
			} 
		}
		this.scrollHeight = this.rowcount * 100 + 250;
		this.game.world.setBounds(0, 0, 320 * this.game.width, this.scrollHeight);
		this.game.input.onDown.add(this.locationPointer, this);
	} 



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
	}
ShopState.prototype.button3Click = function() {
        this.game.state.start("RunningState");
    };
}
