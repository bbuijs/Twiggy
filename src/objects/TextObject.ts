class TextObject extends Phaser.Text{
    constructor(game:Phaser.Game, x:number, y:number, text:string, size:number, color:string = "#FFFFFF"){
        var fontsize = size + "px";
        var fontstyle = "Arial";
        var font = fontsize + " " + fontstyle
        super(game, x, y, text, { font: font, fill: color})
        game.add.existing(this);
    }

    remove(){
        this.remove
    }


}