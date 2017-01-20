var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p)) d[p] = b[p];

    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var MenuScreenState = (function(_super) {
    __extends(MenuScreenState, _super);

    function MenuScreenState() {
        _super.call(this);
        this.count = 0;
    }
    MenuScreenState.prototype.preload = function() {
        this.load.image("title", "assets/images/dog.png");
    };
    MenuScreenState.prototype.create = function() {
        this.titleScreenImage = this.add.sprite(0, 0, "title");
        this.input.onTap.addOnce(this.titleClicked, this);
    };
    MenuScreenState.prototype.titleClicked = function() {
        this.game.state.start("ShopState");
    };
    return MenuScreenState;
}(Phaser.State));
var RunningState = (function(_super) {
    __extends(RunningState, _super);

    function RunningState() {
        _super.call(this);
        this.speed = 1;
        this.curTreeLevel = 1;
    }
    RunningState.prototype.preload = function() {
        this.menuGroup = new GroupObject(this.game);
        this.game.load.image('water', "assets/images/waterdrop.png");
        this.game.load.image('energy', "assets/images/zon.png");
        this.game.load.image('coin', "assets/images/coin.png");
        this.game.load.image('diamond','assets/images/diamond.png');
        this.game.load.image('pear1', 'assets/images/pear/tree-01.png');
        this.game.load.image('pear2', 'assets/images/pear/tree-02.png');
        this.game.load.image('pear3', 'assets/images/pear/tree-03.png');
        this.game.load.image('pear4', 'assets/images/pear/tree-04.png');
        this.game.load.image('cloud', 'assets/images/cloud.png');
        this.game.load.image('cloud2', 'assets/images/cloud2.png');
        this.game.load.image('world', 'assets/images/world1.png');
        this.game.load.image('world2', 'assets/images/world2.png');
        this.game.load.image('world3', 'assets/images/world3.png');
        this.game.load.image('grass2', 'assets/images/Grass_2.png');
        this.game.load.image('mill', 'assets/images/Textured_mill.png');
        this.game.load.image('verkoop', 'assets/images/verkoopbutton.png');
        this.game.load.image('Pear', 'assets/images/Pear.png');
        this.game.load.image('aantal', 'assets/images/Aantal.png');
        this.game.load.image('x', 'assets/images/X.png');
        this.game.load.image('sky', 'assets/images/Sky.png');
        this.game.load.image('apple1', 'assets/images/apple/tree-01.png');
        this.game.load.image('apple2', 'assets/images/apple/tree-02.png');
        this.game.load.image('apple3', 'assets/images/apple/tree-03.png');
        this.game.load.image('apple4', 'assets/images/apple/tree-04.png');
        this.game.load.image('growbutton', 'assets/images/growbutton.png');
        this.game.load.image('button', "assets/images/menu.png");
        this.game.load.image('button1', "assets/images/quest.png");
        this.game.load.image('button2', "assets/images/Upgrade.png");
        this.game.load.image('button3', "assets/images/Profile.png");
        this.game.load.image('shopButton', "assets/images/markt.png");
        this.game.load.image('buttontoshop', "assets/images/Markt.png");
       
        
    };
    RunningState.prototype.create = function() {
        this.game.input.mouse.capture = true;
        var  floor = new Phaser.Rectangle(0, 0,0, 0);
            
        var bmd = this.game.add.bitmapData(600, 400);
        var bmd3 = this.game.add.bitmapData(600, 400);
        this.game.add.sprite(0, 0, 'sky');
        this.game.add.sprite(-80, -5, 'world');
        this.game.add.sprite(30, 445, 'mill');
        this.game.add.sprite(-110, 38, 'world2');
        this.game.add.sprite(0, 520, 'grass2');
        this.cloud = [
            new GameSprite(this.game, 0, 200, "cloud"),
            new GameSprite(this.game, 300, 240, "cloud2"),
            new GameSprite(this.game, 500, 100, "cloud"),
            new GameSprite(this.game, 800, 100, "cloud2"),
        ];
        for (var _i = 0, _a = this.cloud; _i < _a.length; _i++) {
            var item = _a[_i];
            item.setSize(80, 80);
            item.render();
        }
        this.tree = new AppleTree(this.game, this.game.width / 2 - 100, 165, 1);    
        this.tree.setSize(400, 200);
        this.tree.render();
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.refresh();
        this.energy = new Energy(20, 20, 10, Energy.prototype.action, this.game);
        this.energy.setSizes(20, 20);
        this.energy.render();
        this.water = new Water(20, 1000, 10, Water.prototype.action, this.game);
        this.water.setSizes(0, 0);
        this.water.render();
        this.coins = new Coin(this.game.width - 100, 20, 200, Coin.prototype.action, this.game);
        this.coins.setSizes(20, 20);
        this.coins.render();
        this.diamond = new Diamond(this.game.width - 100, 80, 200,Diamond.prototype.action, this.game);
        this.diamond.setSizes(20, 20);
        this.diamond.render();
        this.growbutton = new GrowButton(this.game, this.game.width / 2 - 45, 550, RunningState.prototype.growChecker.bind(this));
        this.growbutton.render();
        this.menubutton = new ButtonObject(this.game, this.game.width - 50, this.game.height - 30, "button", this.toggleMenu.bind(this));
        this.menubutton.anchor.set(0.5);
        this.menuGroup.add(this.menubutton);
        var fourth = this.game.width / 4;
        var eigth = this.game.height / 8;
        this.button = new ButtonObject(this.game, this.game.width - 50, this.game.height + 50, "button1", this.button1Click);
        this.button.setSizes(100, 90);
        this.button.anchor.set(0.5);
        this.menuGroup.add(this.button);
        this.button2 = new ButtonObject(this.game, this.game.width - 50, this.game.height + 100, "button2", this.button2Click);
        this.button2.setSizes(100, 90);
        this.button2.anchor.set(0.5);
        this.menuGroup.add(this.button2);
        this.button3 = new ButtonObject(this.game, this.game.width - 50, this.game.height + 150, "button3", this.button3Click);
        this.button3.setSizes(100, 90);
        this.button3.anchor.set(0.5);
        this.menuGroup.add(this.button3);
        this.shopButton = new ButtonObject(this.game, this.game.width - 50, this.game.height + 200, "shopButton", this.shopButtonCliced);
        this.shopButton.setSizes(100, 90);
        this.shopButton.anchor.set(0.5);
        this.menuGroup.add(this.shopButton);
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateValues.bind(this), this);
        
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
            this.firsttween = this.game.add.tween(barYellow);
                    this.firsttween.to({height:maxHeight},1000);
    
                      

            
};
    RunningState.prototype.update = function() {
        this.moveCloud();
        this.game.world.bringToTop(this.menuGroup);
        this.firsttween.start();
                                   
                
                        
    };
    RunningState.prototype.moveCloud = function() {
        for (var _i = 0, _a = this.cloud; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.x > this.game.width + 60) {
                item.x = 0 - item.width;
            }
            console.log(item.x);
            item.x += 2;
        }
    };
    RunningState.prototype.toggleMenu = function() {
        if (this.menuGroup.y == 0) {
            var menuTween = this.game.add.tween(this.menuGroup).to({
                y: -250
            }, -500, Phaser.Easing.Bounce.Out, true);
            
        }
        if (this.menuGroup.y == -250) {
            var menuTween = this.game.add.tween(this.menuGroup).to({
                y: 0
            }, -500, Phaser.Easing.Bounce.Out, true);
            
        }
    };
    RunningState.prototype.updateValues = function() {
        this.water.amount += 2;
        this.energy.amount += 10;
              
           
    };
    RunningState.prototype.growChecker = function() {
        var oldEnergyNeeded = this.tree.energyNeeded;
        var oldWaterNeeded = this.tree.waterNeeded;
        if (this.tree.upgrade(this.energy.amount)||this.tree.upgrade(this.water.amount)) {
            this.energy.amount = this.energy.amount - oldEnergyNeeded;
           this.water.amount = this.water.amount - oldWaterNeeded;
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
            this.firsttween = this.game.add.tween(barYellow);
                    this.firsttween.to({height:maxHeight},1000);
                    this.firsttween.start ();
        } else {
            console.log("Not enough!");
        }
    };
    RunningState.prototype.button1Click = function() {
        this.game.stage.backgroundColor = "#ff0000";
    };
    RunningState.prototype.button2Click = function() {
        this.game.stage.backgroundColor = "#21ff00";
    };
    RunningState.prototype.button3Click = function() {
        this.game.state.start("profileState");
    };
    RunningState.prototype.shopButtonCliced = function() {
        this.game.state.start("ShopState");
        
    };
    RunningState.prototype.render = function() {};
    return RunningState;
}(Phaser.State));
var ShopState = (function(_super) {
    __extends(ShopState, _super);

    function ShopState() {
        _super.call(this);
        this.rowcount = 0;
        this.placement = 0;
    }
    ShopState.prototype.preload = function() {
        this.load.image("apple", "assets/images/apple.png");
        this.load.image('coin', "assets/images/coin.png");
        this.load.image('diamond', "assets/images/kystal.png");
        this.load.image('water', "assets/images/coin.png");
        this.load.image('earth', "assets/images/sun.png");
        this.load.image('x',"assets/images/X.png");
        this.load.image('sun', "assets/images/sun.png");
        this.game.stage.backgroundColor = "#663300";
    };
    ShopState.prototype.create = function() {
       this.game.add.sprite(300, 0, 'x');
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.addPointer();
        var shopTitle = new TextObject(this.game, this.game.width / 2, 50, "Shop", 50, "#000000");
        shopTitle.anchor.set(0.5);
        this.coins = new Coin(this.game.width / 2 - 100, 90, 200, Coin.prototype.action, this.game);
        this.coins.setSizes(20, 20);
        this.coins.render();
        this.diamond = new Diamond(this.game.width / 2 + 50, 90, 210, Diamond.prototype.action, this.game);
        this.diamond.setSizes(20, 20);
        this.diamond.render();
        this.itemArray = [];
        for (var i = 0; i < 100; i++) {
            this.itemArray.push(new AppleItem(this.game, 0, 0, ShopState.prototype.action));
        }
        for (var _i = 0, _a = this.itemArray; _i < _a.length; _i++) {
            var item = _a[_i];
            item.x = this.placement * 100;
            item.y = this.rowcount * 100 + 120;
            item.setSizes(50, 50);
            item.render();
            this.placement++;
            if (this.placement == 6) {
                this.rowcount++;
                this.placement = 0;
            }
        }
        this.scrollHeight = this.rowcount * 100 + 250;
        this.game.world.setBounds(0, 0, 320 * this.game.width, this.scrollHeight);
        this.game.input.onDown.add(this.locationPointer, this);
    };
    ShopState.prototype.locationPointer = function() {
        this.fromHeight = this.game.input.activePointer.y;
        console.log(this.fromHeight);
    };
    ShopState.prototype.action = function() {};
    ShopState.prototype.render = function() {};
    ShopState.prototype.update = function() {
        if (this.cursors.up.isDown) {
            this.game.camera.y -= 10;
        } else if (this.cursors.down.isDown) {
            this.game.camera.y += 10;
        } else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
            this.game.camera.y -= 50;
            this.game.input.mouse.wheelDelta = null;
        } else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN) {
            this.game.camera.y += 50;
            this.game.input.mouse.wheelDelta = null;
        }
        if (this.game.input.activePointer.isDown) {
            if (this.game.input.y > this.fromHeight) {
                this.game.camera.y += 15;
            } else if (this.game.input.y < this.fromHeight) {
                this.game.camera.y -= 15;
            }
        }
    };
    return ShopState;
}(Phaser.State));

var SimpleGame = (function() {
    function SimpleGame() {
        this.game = new Phaser.Game(200, 150, Phaser.AUTO, 'content');
        this.game.state.add("MenuScreenState", MenuScreenState, false);
        this.game.state.add("RunningState", RunningState, false);
        this.game.state.add("ShopState", ShopState, false);
        this.game.state.start("RunningState", true, true);
    }
    return SimpleGame;
}());
window.onload = function() {
    var game = new SimpleGame();
};
var ButtonObject = (function(_super) {
    __extends(ButtonObject, _super);

    function ButtonObject(game, x, y, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this.keyString = key;
    }
    ButtonObject.prototype.setSizes = function(width, height) {
        this.width = width;
        this.height = height;
        this.game.world.bringToTop(this);
    };
    ButtonObject.prototype.render = function() {
        this.game.add.existing(this);
        this.game.world.bringToTop(this);
    };
    ButtonObject.prototype.action = function() {};
    return ButtonObject;
}(Phaser.Button));
var GrowButton = (function(_super) {
    __extends(GrowButton, _super);

    function GrowButton(game, x, y, callback) {
        _super.call(this, game, x, y, "growbutton", callback);
    }
    GrowButton.prototype.action = function() {
        console.log("test");
    };
    return GrowButton;
}(ButtonObject));
var ItemObject = (function(_super) {
    __extends(ItemObject, _super);

    function ItemObject(name, desc, game, x, y, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this.name = name;
        this.desc = desc;
    }
    return ItemObject;
}(ButtonObject));
var AppleItem = (function(_super) {
    __extends(AppleItem, _super);

    function AppleItem(game, x, y, callback) {
        var name = "Apple";
        var desc = "This is an apple";
        _super.call(this, name, desc, game, x, y, "apple", callback);
    }
    AppleItem.prototype.action = function() {
        console.log("Check money");
        console.log("Plus one Apple");
    };
    return AppleItem;
}(ItemObject));
var PearItem = (function(_super) {
    __extends(PearItem, _super);

    function PearItem(game, x, y, callback) {
        var name = "Pear";
        var desc = "This is a Pear";
        _super.call(this, name, desc, game, x, y, "pear", callback);
    }
    PearItem.prototype.action = function() {
        console.log("Check money");
        console.log("Plus one Pear");
    };
    return PearItem;
}(ItemObject));
var GameObject = (function() {
    function GameObject(x, y) {
        this.x = x;
        this.y = y;
    }
    return GameObject;
}());
var GameSprite = (function(_super) {
    __extends(GameSprite, _super);

    function GameSprite(game, x, y, key) {
        _super.call(this, game, x, y, key);
        this.keyString = key;
        this.x = x;
        this.y = y;
        this.game = game;
    }
    GameSprite.prototype.setSize = function(height, width) {
        this.height = height;
        this.width = width;
    };
    GameSprite.prototype.render = function() {
        this.game.add.existing(this);
    };
    return GameSprite;
}(Phaser.Sprite));
var GroupObject = (function(_super) {
    __extends(GroupObject, _super);

    function GroupObject() {
        _super.apply(this, arguments);
    }
    return GroupObject;
}(Phaser.Group));
var ResourcesObject = (function(_super) {
    __extends(ResourcesObject, _super);

    function ResourcesObject(game, x, y, amount, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this._amount = amount;
        this.setValue(this.amount);
    }
    ResourcesObject.prototype.setValue = function(amount) {
        console.log("setting value");
        var x = this.x + 30;
        var y = this.y;
        var amountString = String(amount);
        this.text = new TextObject(this.game, x, y, amountString, 15, "#000000");
    };
    ResourcesObject.prototype.updateValue = function(amount) {
        var amountString = String(amount);
        this.text.setText(amountString);
    };
    Object.defineProperty(ResourcesObject.prototype, "amount", {
        get: function() {
            return this._amount;
        },
        set: function(amount) {
            this._amount = amount;
            this.updateValue(this._amount);
        },
        enumerable: true,
        configurable: true
    });
    return ResourcesObject;
}(ButtonObject));
var TextObject = (function(_super) {
    __extends(TextObject, _super);

    function TextObject(game, x, y, text, size, color) {
        if (color === void 0) { color = "#FFFFFF"; }
        var fontsize = size + "px";
        var fontstyle = "Arial";
        var font = fontsize + " " + fontstyle;
        _super.call(this, game, x, y, text, { font: font, fill: color });
        game.add.existing(this);
    }
    TextObject.prototype.remove = function() {
        this.remove;
    };
    return TextObject;
}(Phaser.Text));
var Tree = (function(_super) {
    __extends(Tree, _super);

    function Tree(game, x, y, currentLevel, keys, maxLevel, startEnergy) {
        _super.call(this, game, x, y, keys[currentLevel - 1]);
        this.keys = keys;
        this.startAmountEnergy = startEnergy;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel;
        this.calcNeeded();
    }
    Tree.prototype.changeKey = function() {
        var key = this.keys[this.currentLevel - 1];
        this.loadTexture(key, 0);
    };
    Tree.prototype.calcNeeded = function() {
        this.energyNeeded = this.startAmountEnergy * (this.currentLevel + 1);
    };
    Tree.prototype.upgrade = function(energy) {
        console.log("Energy " + energy);
        if (this.currentLevel != this.maxLevel) {
            if (this.energyNeeded <= energy) {
                this.currentLevel += 1;
                console.log(this.currentLevel);
                this.calcNeeded();
                this.changeKey();
                return true;
            } else {
                return false;
            }
        } else {
            console.log("You Have reached max level!");
            return false;
        }
    };
    return Tree;
}(GameSprite));
var wBar = (function(_super) {
    __extends(wBar, _super);

    function wBar(game, x, y, currentLevel, keys, maxLevel, startWater) {
        _super.call(this, game, x, y, keys[currentLevel - 1]);
        this.keys = keys;
        this.startAmountWater = startWater;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel;
        this.calcNeeded();
    }
    wBar.prototype.calcNeeded = function() {
        this.WaterNeeded = this.startAmountWater * (this.currentLevel + 1);
    };
    wBar.prototype.upgrade = function(Water) {
        console.log("Water " + Water);
        if (this.currentLevel != this.maxLevel) {
            if (this.WaterNeeded <= Water) {
                this.currentLevel += 1;
                console.log(this.currentLevel);
                this.calcNeeded();
                return true;
            } else {
                return false;
            }
        } else {
            console.log("Maxed!");
            return false;
        }
    };
    return wBar;
}(GameSprite));
var Coin = (function(_super) {
    __extends(Coin, _super);

    function Coin(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'coin', callback);
        this.game = game;
    }
    Coin.prototype.action = function() {
        console.log(this.amount);
    };
    return Coin;
}(ResourcesObject));
var Diamond = (function(_super)
 {
    __extends(Diamond, _super);

    function Diamond(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'diamond', callback);
        this.game = game;
    }
    Diamond.prototype.action = function() {
        console.log(this.amount);
    };
    return Diamond;
}(ResourcesObject));
var Energy = (function(_super) {
    __extends(Energy, _super);

    function Energy(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'energy', callback);
        this.game = game;
    }
    Energy.prototype.action = function() {
        console.log("Sun Clicked");
    };
    return Energy;
}(ResourcesObject));
var Water = (function(_super) {
    __extends(Water, _super);

    function Water(x, y, amount, callback, game) {
        var keys = ["wBar1", "wBar2", "wBar3", "wBar4"];
        _super.call(this, game, x, y, amount, 'water', callback);
        var maxLevel = 10;
        this.game = game;
    }
    Water.prototype.action = function() {
        console.log("Water Clicked");
    };
    return Water;
}(ResourcesObject));
var AppleTree = (function(_super) {
    __extends(AppleTree, _super);
   
           

    function AppleTree(game, x, y, level) {
        var keys = ["apple1", "apple2", "apple3", "apple4"];
        var maxLevel = 4;
        var energy = 20;
        var water = 2;
        _super.call(this, game, x, y, level, keys, maxLevel, energy);
        
      
          

}
    return AppleTree;
}(Tree));
var PearTree = (function(_super) {
    __extends(PearTree, _super);

    function PearTree(game, x, y, level) {
        var keys = ["pear1", "pear2", "pear3", "pear4"];
        var maxLevel = 4;
        var energy = 10;
        _super.call(this, game, x, y, level, keys, maxLevel, energy);
    }
    return PearTree;
}(Tree));
//# sourceMappingURL=game.js.map