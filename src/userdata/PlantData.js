var PlantData = (function () {
    function PlantData(id, title, exp, state_id, species_id) {
        console.log(id);
        this._id = id;
        this.title = title;
        this.exp = exp;
        this.state_id = state_id;
        this.species_id = species_id;
    }
    return PlantData;
}());
