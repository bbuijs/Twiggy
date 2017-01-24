class PlantData{
    _id:string;
    title:string;
    exp:number;
    state_id:number;
    species_id:number;

    constructor(id:string,title:string, exp:number, state_id:number, species_id:number){
        console.log(id);
        this._id = id;
        this.title = title;
        this.exp = exp;
        this.state_id = state_id;
        this.species_id = species_id;
    }

}