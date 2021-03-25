const admin = require('../admin');
const firebase = require('firebase-admin');
const firestore = firebase.firestore();



function signIn(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
    // Signed in
    console.log(userCredential.user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

module.exports = {
    signIn
}