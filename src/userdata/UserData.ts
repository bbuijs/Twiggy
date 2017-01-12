class UserData{
    //TODO Energy, Water, Diamonds, Coins and Plot->Plant
    energy:number;
    water:number;
    coin:number;
    diamond:number;
    plot:Plot;
    user:UserObject;
    plant:PlantData;

    constructor(energy:number, water:number, coin:number, diamond:number, plot:Plot, user:UserObject){
        //set the resources
        this.energy = energy;
        this.water = water;
        this.coin = coin;
        this.diamond = diamond;
        //set plot and user data.
        this.plot = plot;
        this.user = user;
    }
}