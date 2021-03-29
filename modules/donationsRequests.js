  
class DonationRequests {
    constructor(id, anonymous, location, status, timeStamp, type, uid) {
        this.id = id;   
        this.anonymous = anonymous;
        this.location = location; 
        this.status = status;
        this.timeStamp = timeStamp;
        this.type = type;
        this.uid = uid;
    }
}

module.exports = DonationRequests;