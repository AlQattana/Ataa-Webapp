  
class Donation {
    constructor(id, anonymous, desc, image, location, notifyAt, status, timeStamp, type, user) {
        this.id = id;   
        this.anonymous = anonymous;
        this.desc = desc;
        this.image = image;
        this.location = location; 
        this.notifyAt = notifyAt;
        this.status = status;
        this.timeStamp = timeStamp;
        this.type = type;
        this.user = user;
    }
}

module.exports = Donation;