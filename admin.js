const admin = require('firebase-admin')
//const firebase = require('firebase');

const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL: "https://ataa-770e0-default-rtdb.firebaseio.com"
})

module.exports = {
    createUser : function createUser(user){
      admin
      .auth()
      .createUser({
        email: user["email"],
        emailVerified: false,
        phoneNumber: user["phone"],
        password: user["pass"],
        displayName: user["name"],
        disabled: false,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
      });
  }
};