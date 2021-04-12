const admin = require('../admin');
const firebase = require('../db')
const firestore = firebase.firestore();


module.exports.signIn =  async function(email, password){
  let user = await firebase.auth().signInWithEmailAndPassword(email, password).then(({user}) => {
    return user;
  }).catch((err) => {
    return 0;
  })
  return user;
}

function signOut(){
  firebase.auth().signOut();
}
