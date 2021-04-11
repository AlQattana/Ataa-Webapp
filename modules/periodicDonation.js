  
class PeriodicDonation {
    constructor(id, date, days, frequency, status, type, uid) {
        this.id = id;   
        this.date = date;
        this.days = days; 
        this.frequency = frequency;
        this.status = status;
        this.type = type;
        this.uid = uid;
    }
}

module.exports = PeriodicDonation;