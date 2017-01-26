var Plot = (function () {
    function Plot(id, title, location, region, plant) {
        this.id = id;
        this.location = location;
        this.title = title;
        this.region = region;
        if (plant) {
            this.plant = new PlantData(plant._id, plant.title, plant.exp, plant.state_id, plant.species_id);
        }
        else {
            this.plant = null;
        }
        // constructor(title:string, exp:number, state_id:number, species_id:number){
    }
    return Plot;
}());
