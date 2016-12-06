var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuScreenState = (function (_super) {
    __extends(MenuScreenState, _super);
    function MenuScreenState() {
        _super.call(this);
        this.count = 0;
    }
    MenuScreenState.prototype.preload = function () {
        this.load.image("title", "assets/images/dog.png");
    };
    MenuScreenState.prototype.create = function () {
        this.titleScreenImage = this.add.sprite(0, 0, "title");
        this.input.onTap.addOnce(this.titleClicked, this);
    };
    MenuScreenState.prototype.titleClicked = function () {
        this.game.state.start("ShopState");
    };
    return MenuScreenState;
}(Phaser.State));
var RunningState = (function (_super) {
    __extends(RunningState, _super);
    function RunningState() {
        _super.call(this);
        this.speed = 1;
        this.curTreeLevel = 1;
    }
    RunningState.prototype.preload = function () {
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
        this.game.load.image('apple1', 'assets/images/apple/tree-01.png');
        this.game.load.image('apple2', 'assets/images/apple/tree-02.png');
        this.game.load.image('apple3', 'assets/images/apple/tree-03.png');
        this.game.load.image('apple4', 'assets/images/apple/tree-04.png');
        this.game.load.image('pear1', 'assets/images/pear/tree-01.png');
        this.game.load.image('pear2', 'assets/images/pear/tree-02.png');
        this.game.load.image('pear3', 'assets/images/pear/tree-03.png');
        this.game.load.image('pear4', 'assets/images/pear/tree-04.png');
        this.game.load.image('cloud', 'assets/images/cloud.png');
        this.game.load.image('world', 'assets/images/world.png');
    };
    RunningState.prototype.create = function () {
        this.game.stage.backgroundColor = "#0000FF";
        this.cloud = [
            new GameSprite(this.game, 0, 200, "cloud"),
            new GameSprite(this.game, 200, 240, "cloud"),
            new GameSprite(this.game, 500, 100, "cloud"),
        ];
        for (var _i = 0, _a = this.cloud; _i < _a.length; _i++) {
            var item = _a[_i];
            item.setSize(80, 80);
            item.render();
        }
        this.gameWorld = new GameSprite(this.game, 0, this.game.height - 600, "world");
        this.gameWorld.setSize(600, this.game.width);
        this.gameWorld.render();
        this.tree = new PearTree(this.game, this.game.width / 2 - 100, this.game.height - 460, 1);
        this.tree.setSize(400, 200);
        this.tree.render();
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.refresh();
        this.energyResource = new Energy(20, 20, 10, Energy.prototype.action, this.game);
        this.energyResource.setSizes(20, 20);
        this.energyResource.render();
        this.waterResource = new Water(20, 80, 10, Water.prototype.action, this.game);
        this.waterResource.setSizes(20, 20);
        this.waterResource.render();
        this.coins = new Coin(this.game.width - 200, 20, 200, Coin.prototype.action, this.game);
        this.coins.setSizes(20, 20);
        this.coins.render();
        this.growbutton = new GrowButton(this.game, this.game.width / 2 - 45, this.game.height - 50, RunningState.prototype.growChecker.bind(this));
        this.growbutton.render();
        this.menubutton = new ButtonObject(this.game, this.game.width - 30, this.game.height - 30, "button", this.toggleMenu.bind(this));
        this.menubutton.anchor.set(0.5);
        this.menuGroup.add(this.menubutton);
        var fourth = this.game.width / 4;
        var eigth = this.game.height / 8;
        this.button = new ButtonObject(this.game, this.game.width - 30, this.game.height + 50, "button1", this.button1Click);
        this.button.setSizes(50, 50);
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
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateValues.bind(this), this);
    };
    RunningState.prototype.update = function () {
        this.moveCloud();
    };
    RunningState.prototype.moveCloud = function () {
        for (var _i = 0, _a = this.cloud; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.x > this.game.width + 50) {
                item.x = 0 - item.width;
            }
            item.x += 5;
        }
    };
    RunningState.prototype.toggleMenu = function () {
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
    };
    RunningState.prototype.updateValues = function () {
        this.waterResource.amount += 10;
        this.energyResource.amount += 10;
    };
    RunningState.prototype.growChecker = function () {
        var oldEnergyNeeded = this.tree.energyNeeded;
        if (this.tree.upgrade(this.energyResource.amount)) {
            this.energyResource.amount = this.energyResource.amount - oldEnergyNeeded;
        }
        else {
            console.log("Not enough!");
        }
    };
    RunningState.prototype.button1Click = function () {
        this.game.stage.backgroundColor = "#ff0000";
    };
    RunningState.prototype.button2Click = function () {
        this.game.stage.backgroundColor = "#21ff00";
    };
    RunningState.prototype.button3Click = function () {
        this.game.stage.backgroundColor = "#0043ff";
    };
    RunningState.prototype.shopButtonCliced = function () {
        this.game.state.start("ShopState");
    };
    RunningState.prototype.render = function () {
    };
    return RunningState;
}(Phaser.State));
var ShopState = (function (_super) {
    __extends(ShopState, _super);
    function ShopState() {
        _super.call(this);
        this.rowcount = 0;
        this.placement = 0;
    }
    ShopState.prototype.preload = function () {
        this.load.image("apple", "assets/images/apple.png");
        this.load.image('coin', "assets/images/dog.png");
        this.load.image('diamond', "assets/images/dog.png");
        this.load.image('water', "assets/images/dog.png");
        this.load.image('earth', "assets/images/sun.png");
        this.load.image('sun', "assets/images/sun.png");
        this.game.stage.backgroundColor = "#0000FF";
    };
    ShopState.prototype.create = function () {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.addPointer();
        var shopTitle = new TextObject(this.game, this.game.width / 2, 50, "Shop", 50, "#000000");
        shopTitle.anchor.set(0.5);
        this.coins = new Coin(this.game.width / 2 - 100, 90, 200, Coin.prototype.action, this.game);
        this.coins.setSizes(20, 20);
        this.coins.render();
        this.diamonds = new Diamond(this.game.width / 2 + 50, 90, 210, Coin.prototype.action, this.game);
        this.diamonds.setSizes(20, 20);
        this.diamonds.render();
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
    ShopState.prototype.locationPointer = function () {
        this.fromHeight = this.game.input.activePointer.y;
        console.log(this.fromHeight);
    };
    ShopState.prototype.action = function () {
    };
    ShopState.prototype.render = function () {
    };
    ShopState.prototype.update = function () {
        if (this.cursors.up.isDown) {
            this.game.camera.y -= 10;
        }
        else if (this.cursors.down.isDown) {
            this.game.camera.y += 10;
        }
        else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
            this.game.camera.y -= 50;
            this.game.input.mouse.wheelDelta = null;
        }
        else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN) {
            this.game.camera.y += 50;
            this.game.input.mouse.wheelDelta = null;
        }
        if (this.game.input.activePointer.isDown) {
            if (this.game.input.y > this.fromHeight) {
                this.game.camera.y += 15;
            }
            else if (this.game.input.y < this.fromHeight) {
                this.game.camera.y -= 15;
            }
        }
    };
    return ShopState;
}(Phaser.State));
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
        this.game.state.add("MenuScreenState", MenuScreenState, false);
        this.game.state.add("RunningState", RunningState, false);
        this.game.state.add("ShopState", ShopState, false);
        this.game.state.start("RunningState", true, true);
    }
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
var ButtonObject = (function (_super) {
    __extends(ButtonObject, _super);
    function ButtonObject(game, x, y, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this.keyString = key;
    }
    ButtonObject.prototype.setSizes = function (width, height) {
        this.width = width;
        this.height = height;
    };
    ButtonObject.prototype.render = function () {
        this.game.add.existing(this);
    };
    ButtonObject.prototype.action = function () { };
    return ButtonObject;
}(Phaser.Button));
var GrowButton = (function (_super) {
    __extends(GrowButton, _super);
    function GrowButton(game, x, y, callback) {
        _super.call(this, game, x, y, "growbutton", callback);
    }
    GrowButton.prototype.action = function () {
        console.log("test");
    };
    return GrowButton;
}(ButtonObject));
var ItemObject = (function (_super) {
    __extends(ItemObject, _super);
    function ItemObject(name, desc, game, x, y, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this.name = name;
        this.desc = desc;
    }
    return ItemObject;
}(ButtonObject));
var AppleItem = (function (_super) {
    __extends(AppleItem, _super);
    function AppleItem(game, x, y, callback) {
        var name = "Apple";
        var desc = "This is an apple";
        _super.call(this, name, desc, game, x, y, "apple", callback);
    }
    AppleItem.prototype.action = function () {
        console.log("Check money");
        console.log("Plus one Applle");
    };
    return AppleItem;
}(ItemObject));
var GameObject = (function () {
    function GameObject(x, y) {
        this.x = x;
        this.y = y;
    }
    return GameObject;
}());
var GameSprite = (function (_super) {
    __extends(GameSprite, _super);
    function GameSprite(game, x, y, key) {
        _super.call(this, game, x, y, key);
        this.keyString = key;
        this.x = x;
        this.y = y;
        this.game = game;
    }
    GameSprite.prototype.setSize = function (height, width) {
        this.height = height;
        this.width = width;
    };
    GameSprite.prototype.render = function () {
        this.game.add.existing(this);
    };
    return GameSprite;
}(Phaser.Sprite));
var GroupObject = (function (_super) {
    __extends(GroupObject, _super);
    function GroupObject() {
        _super.apply(this, arguments);
    }
    return GroupObject;
}(Phaser.Group));
var ResourcesObject = (function (_super) {
    __extends(ResourcesObject, _super);
    function ResourcesObject(game, x, y, amount, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this._amount = amount;
        this.setValue(this.amount);
    }
    ResourcesObject.prototype.setValue = function (amount) {
        console.log("setting value");
        var x = this.x + 30;
        var y = this.y;
        var amountString = String(amount);
        this.text = new TextObject(this.game, x, y, amountString, 15, "#000000");
    };
    ResourcesObject.prototype.updateValue = function (amount) {
        var amountString = String(amount);
        this.text.setText(amountString);
    };
    Object.defineProperty(ResourcesObject.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        set: function (amount) {
            this._amount = amount;
            this.updateValue(this._amount);
        },
        enumerable: true,
        configurable: true
    });
    return ResourcesObject;
}(ButtonObject));
var TextObject = (function (_super) {
    __extends(TextObject, _super);
    function TextObject(game, x, y, text, size, color) {
        if (color === void 0) { color = "#FFFFFF"; }
        var fontsize = size + "px";
        var fontstyle = "Arial";
        var font = fontsize + " " + fontstyle;
        _super.call(this, game, x, y, text, { font: font, fill: color });
        game.add.existing(this);
    }
    TextObject.prototype.remove = function () {
        this.remove;
    };
    return TextObject;
}(Phaser.Text));
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree(game, x, y, currentLevel, keys, maxLevel, startEnergy) {
        _super.call(this, game, x, y, keys[currentLevel - 1]);
        this.keys = keys;
        this.startAmountEnergy = startEnergy;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel;
        this.calcNeeded();
    }
    Tree.prototype.changeKey = function () {
        var key = this.keys[this.currentLevel - 1];
        this.loadTexture(key, 0);
    };
    Tree.prototype.calcNeeded = function () {
        this.energyNeeded = this.startAmountEnergy * (this.currentLevel + 1);
    };
    Tree.prototype.upgrade = function (energy) {
        console.log("Energy " + energy);
        if (this.currentLevel != this.maxLevel) {
            if (this.energyNeeded <= energy) {
                this.currentLevel += 1;
                console.log(this.currentLevel);
                this.calcNeeded();
                this.changeKey();
                return true;
            }
            else {
                return false;
            }
        }
        else {
            console.log("You Have reached max level!");
            return false;
        }
    };
    return Tree;
}(GameSprite));
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'coin', callback);
        this.game = game;
    }
    Coin.prototype.action = function () {
        console.log(this.amount);
    };
    return Coin;
}(ResourcesObject));
var Diamond = (function (_super) {
    __extends(Diamond, _super);
    function Diamond(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'diamond', callback);
        this.game = game;
    }
    Diamond.prototype.action = function () {
        console.log(this.amount);
    };
    return Diamond;
}(ResourcesObject));
var Energy = (function (_super) {
    __extends(Energy, _super);
    function Energy(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'energy', callback);
        this.game = game;
    }
    Energy.prototype.action = function () {
        console.log("Sun Clicked");
    };
    return Energy;
}(ResourcesObject));
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'water', callback);
        this.game = game;
    }
    Water.prototype.action = function () {
        console.log("Water Clicked");
    };
    return Water;
}(ResourcesObject));
var AppleTree = (function (_super) {
    __extends(AppleTree, _super);
    function AppleTree(game, x, y, level) {
        var keys = ["apple1", "apple2", "apple3", "apple4"];
        var maxLevel = 4;
        var energy = 20;
        _super.call(this, game, x, y, level, keys, maxLevel, energy);
    }
    return AppleTree;
}(Tree));
var PearTree = (function (_super) {
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