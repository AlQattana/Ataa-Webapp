const admin = require('firebase-admin')
//const firebase = require('firebase');

const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL: "https://ataa-770e0-default-rtdb.firebaseio.com"
})

module.exports = admin;