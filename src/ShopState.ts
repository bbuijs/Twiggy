class ShopState extends Phaser.State{
	//resourses
	water:Water; 
	sun:Sun; 
	earth:Earth;

	coins:Coin; 
	diamonds:Diamond;

	// menuGroup:Phaser.Group; // maakt var van groep phaser..
	itemArray:Array<ItemObject>;
	
	constructor() {
		super();
	}

    preload()
	{
		this.load.image("apple", "assets/images/apple.png");
		// this.load.image("apple", "assets/images/apple.png");
		

		//loading the resourses
		//load the sprite of the resourses
		this.load.image( 'coin', "assets/images/dog.png" );
		this.load.image( 'diamond', "assets/images/dog.png" );

		this.load.image( 'water', "assets/images/dog.png" );
		this.load.image( 'earth', "assets/images/sun.png" );
		this.load.image( 'sun', "assets/images/sun.png");
		this.game.stage.backgroundColor = "#0000FF";
	}
	
	create()
	{
		//Set title of screen
		var shopTitle = new TextObject(this.game,this.game.width / 2, 50,"Shop", 50, "#000000")
		shopTitle.anchor.set(0.5);
		//set coin and diamods
		this.coins = new Coin(this.game.width / 2 - 100, 90, 200,Coin.prototype.action, this.game);
		this.coins.setSizes(20,20);
		this.coins.render();

		this.diamonds = new Diamond(this.game.width / 2 + 50, 90,200,Coin.prototype.action, this.game);
		this.diamonds.setSizes(20,20);
		this.diamonds.render();



		//set line for decoration
		var linePosY = 120;
		var line = new Phaser.Line(0,linePosY,this.game.width,linePosY);
		this.game.debug.geom(line,"#000000");
		//set the list of items in list
		this.itemArray = [
			new AppleItem(this.game,200,100, ShopState.prototype.action),
		]

		for(var item of this.itemArray){
			item.setSizes(40,40);
			item.render();
		}

		this.makeScorable();
	} 

	makeScorable(){
		var containerSprite = this.game.add.sprite( 0, 0 );
		var scrollMask = this.game.add.graphics(0, 0);
		scrollMask.beginFill(0xffffff);
		scrollMask.drawRect( 0, 0, this.game.width, this.game.height );
		scrollMask.endFill();containerSprite.mask = scrollMask;
		// Add your sprites and text to the containerSprite using addChild
		// You can move the mask, move the container sprite, and move the sprites within the container.
	}

	action(){

	}

	//user this for rendering
	render(){
		//
	}
}

//See my plugin for Phaser :) http://jdnichollsc.github.io/Phaser-Kinetic-Scrolling-Plugin/

// var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
//   init: function(){
//     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     this.scale.maxWidth = 1024;//1024;
//     this.scale.maxHeight = 768;//768;
//     this.scale.pageAlignHorizontally = true;
//     this.scale.pageAlignVertically = true;
//     this.scale.setScreenSize(true);
//   },
//   preload: function(){
//     this.game.stage.backgroundColor = '#FFF';
//   },
//   create: function(){
    
//     this.rectangles = [];
    
//     var initX = 50;
    
//     for(var i = 0; i< 26; i++){
//       this.rectangles.push(this.createRectangle(initX, this.game.world.centerY - 200, 250, 400, i));
//       this.index = this.game.add.text(initX +125, this.game.world.centerY, i + 1,
// 			{ font: 'bold 150px Arial', align: "center" });
// 		  this.index.anchor.set(0.5);
//       initX += 300;
//     }    
    
//     this.game.world.setBounds(0, 0, 320 * this.rectangles.length, this.game.height);
        
//     this.positionX = this.game.add.text(0,0, 'Mouse/Touch x',
//     {
//       font: 'bold 50px "Arial"',
//       align: 'center'
//     });
//     this.positionX.anchor.set(0.5);
//     this.positionX.fixedToCamera = true;
//     this.positionX.cameraOffset.setTo(this.game.width/2,70);
    
//     this.cameraX = this.game.add.text(0,0, 'Camera x',
//     {
//       font: 'bold 50px "Arial"',
//       align: 'center'
//     });
//     this.cameraX.anchor.set(0.5);
//     this.cameraX.fixedToCamera = true;
//     this.cameraX.cameraOffset.setTo(this.game.width/2,this.game.height - 80);
    
//     this.dragging = false;
//     this.autoScroll = false;
//     this.timeConstant = 325; //really mimic iOS
//     this.game.input.onDown.add(this.beginMove, this);
//     this.game.input.onUp.add(this.endMove, this);    
//     this.game.input.addMoveCallback(this.moveCamera, this);
//   },
//   update: function(){
//     this.cameraX.setText("Camera x:" + this.game.camera.x.toFixed(2));
//     if(this.autoScroll && this.amplitude != 0){
//       this.elapsed = Date.now() - this.timestamp;
//       var delta = -this.amplitude * Math.exp(-this.elapsed / this.timeConstant);
//       if ((delta > 0.5 || delta < -0.5)) {
//         this.game.camera.x = this.target - delta;
//         this.autoScroll = true;
//       } 
//       else {
//         this.autoScroll = false;
//         this.game.camera.x = this.target;
//       }
//     }
//   },
//   beginMove: function(){
//     this.startX = this.game.input.x;
//     this.dragging = true;
//     this.timestamp = Date.now();
//     this.velocity = this.amplitude = 0;
//   },
//   endMove: function(){
//     this.dragging = false;
//     this.autoScroll = false;
//     if (this.game.input.activePointer.withinGame && (this.velocity > 10 || this.velocity < -10)) {
//         this.amplitude = 0.8 * this.velocity;
//         this.now = Date.now(); 
//         this.target = Math.round(this.game.camera.x - this.amplitude);
//         this.autoScroll = true;
//     }
//     if(!this.game.input.activePointer.withinGame){
//        this.autoScroll = true;
//     }
//     console.log(this.velocity);
//   },
//   moveCamera: function(pointer, x, y){
    
//     if(this.dragging){
//       var delta = x - this.startX; //Compute move distance
//       this.startX = x;
//       this.now = Date.now();
//       var elapsed = this.now - this.timestamp;
//       this.timestamp = this.now;
      
//       var v = 1000 * delta / (1 + elapsed);
//       this.velocity = 0.8 * v + 0.2 * this.velocity;
      
//       this.game.camera.x -= delta;
//       this.positionX.setText("Mouse/Touch x:" + x.toFixed(2));
//     }
//   },
//   createRectangle: function(x, y, w, h){
//     var rectangle = {};
//     rectangle.sprite = game.add.graphics(x, y); 
//     rectangle.sprite.beginFill(Phaser.Color.getRandomColor(100, 255), 1);
//     rectangle.sprite.bounds = new PIXI.Rectangle(0, 0, w, h);
//     rectangle.sprite.drawRect(0, 0, w, h);
//     return rectangle;
//   }
// });