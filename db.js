const firebase = require('firebase');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);
//db.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

module.exports = db;