  
class User {
    //constructor(id = 1, location = null, name = null, specialty = null, status = null){
    constructor(id, name, type, status) {
        this.id = id;    
        this.name = name;
        this.type = type;
        this.status = status;
    }
}

module.exports = User;