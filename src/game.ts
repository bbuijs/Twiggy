/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./RunningState.ts" />

class SimpleGame
{
	game:Phaser.Game;

	constructor()
	{
		//setup the game
		this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
		this.game.state.add("MenuScreenState", MenuScreenState , false);
		this.game.state.add("RunningState", RunningState , false);
		this.game.state.add("ShopState", ShopState , false);
		this.game.state.start("RunningState",true,true);
	}
}


// when the page has finished loading, create our game
window.onload = () => {
	new SimpleGame();
};
