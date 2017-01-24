var UserData = (function () {
    function UserData(energy, water, coin, diamond, plot, user) {
        //set the resources
        this.energy = energy;
        this.water = water;
        this.coin = coin;
        this.diamond = diamond;
        //set plot and user data.
        this.plot = plot;
        this.user = user;
    }
    return UserData;
}());
