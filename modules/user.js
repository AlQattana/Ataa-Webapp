  
class User {
    //constructor(id = 1, location = null, name = null, specialty = null, status = null){
    constructor(id, addressLine, brithdate, email, first_name, last_name, geoPoint, pantsSize, _private, shirtSize, shoeSize, status, type, uid, cid) {
        this.id = id,
        this.addressLine = addressLine,
        this.brithdate = brithdate,
        this.email = email,
        this.first_name = first_name,
        this.last_name = last_name,
        this.geoPoint = geoPoint,
        this.pantsSize = pantsSize,
        this.private = _private,
        this.shirtSize = shirtSize,
        this.shoeSize = shirtSize,
        this.status = status,
        this.type = type,
        this.uid = uid,
        this.cid = cid   
    }
}

module.exports = User;