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
        this.game.load.image('water', "assets/images/dog.png");
        this.game.load.image('energy', "assets/images/sun.png");
        this.game.load.image('button', "assets/images/button.png");
        this.game.load.image('coin', "assets/images/sun.png");
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
        this.tree = new PearTree(this.game, this.game.width / 2 - 100, 0, 1);
        this.tree.setSize(400, 200);
        this.tree.render();
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.refresh();
        this.energy = new Sun(20, 20, 10, Sun.prototype.action, this.game);
        this.energy.setSizes(20, 20);
        this.energy.render();
        this.water = new Water(20, 80, 10, Water.prototype.action, this.game);
        this.water.setSizes(20, 20);
        this.water.render();
        this.coins = new Coin(this.game.width - 200, 20, 200, Coin.prototype.action, this.game);
        this.coins.setSizes(20, 20);
        this.coins.render();
        this.growbutton = new GrowButton(this.game, this.game.width / 2 - 45, 500, RunningState.prototype.growChecker.bind(this));
        this.growbutton.render();
        console.log(this.growbutton);
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
        console.log(this.menuGroup);
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
            console.log(item.x);
            item.x += 5;
        }
    };
    RunningState.prototype.goToShopState = function () {
        console.log("Yeah right, clicked the button.");
    };
    RunningState.prototype.growTree = function () {
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
        this.water.amount += 10;
        this.energy.amount += 10;
    };
    RunningState.prototype.growChecker = function () {
        var oldEnergyNeeded = this.tree.energyNeeded;
        if (this.tree.upgrade(this.energy.amount)) {
            this.energy.amount = this.energy.amount - oldEnergyNeeded;
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
        var shopTitle = new TextObject(this.game, this.game.width / 2, 50, "Shop", 50, "#000000");
        shopTitle.anchor.set(0.5);
        this.coins = new Coin(this.game.width / 2 - 100, 90, 200, Coin.prototype.action, this.game);
        this.coins.setSizes(20, 20);
        this.coins.render();
        this.diamonds = new Diamond(this.game.width / 2 + 50, 90, 200, Coin.prototype.action, this.game);
        this.diamonds.setSizes(20, 20);
        this.diamonds.render();
        var linePosY = 120;
        var line = new Phaser.Line(0, linePosY, this.game.width, linePosY);
        this.game.debug.geom(line, "#000000");
        this.itemArray = [
            new AppleItem(this.game, 200, 100, ShopState.prototype.action),
        ];
        for (var _i = 0, _a = this.itemArray; _i < _a.length; _i++) {
            var item = _a[_i];
            item.setSizes(40, 40);
            item.render();
        }
        this.makeScorable();
    };
    ShopState.prototype.makeScorable = function () {
        var containerSprite = this.game.add.sprite(0, 0);
        var scrollMask = this.game.add.graphics(0, 0);
        scrollMask.beginFill(0xffffff);
        scrollMask.drawRect(0, 0, this.game.width, this.game.height);
        scrollMask.endFill();
        containerSprite.mask = scrollMask;
    };
    ShopState.prototype.action = function () {
    };
    ShopState.prototype.render = function () {
    };
    return ShopState;
}(Phaser.State));
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
var Earth = (function (_super) {
    __extends(Earth, _super);
    function Earth(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'earth', callback);
        this.game = game;
    }
    Earth.prototype.action = function () {
        console.log(this.amount);
    };
    return Earth;
}(ResourcesObject));
var Sun = (function (_super) {
    __extends(Sun, _super);
    function Sun(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'sun', callback);
        this.game = game;
    }
    Sun.prototype.action = function () {
        console.log("Sun Clicked");
    };
    return Sun;
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