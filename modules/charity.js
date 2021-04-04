class Charity {
    //constructor(id = 1, location = null, name = null, specialty = null, status = null){
    constructor(id, location, name, specialty, status) {
        this.id = id;    
        this.location = location;
        this.name = name;
        this.specialty = specialty;
        this.status = status;
    }
}

module.exports = Charity;