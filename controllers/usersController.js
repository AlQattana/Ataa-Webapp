const admin = require('../admin');
const firebase = require('firebase-admin');
const firestore = firebase.firestore();
const User = require('../modules/user');
var usersArray = [];

function addCharity(charity){
  admin.auth().createUser({
    email: charity["email"],
    emailVerified: false,
    phoneNumber: charity["phone"],
    password: charity["pass"],
    displayName: charity["name"],
    disabled: false,
  }).then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    firestore.collection('charities').doc(userRecord.uid).set({
      location : null,
      specialty : null,
      name : charity["name"],
      status : "not active"
    })
    console.log('Successfully created new user:', userRecord.uid);
  }).catch((error) => {
    console.log('Error creating new user:', error);
  });
};

function addCharityRep(charityRep){
  admin.auth().createUser({
    email: charityRep["email"],
    emailVerified: false,
    phoneNumber: charityRep["phone"],
    password: charityRep["pass"],
    displayName: charityRep["name"],
    disabled: false,
  }).then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    firestore.collection('users').doc(userRecord.uid).set({
      birthdate : null,
      name : charityRep["name"],
      type : "Representative",
      uid : userRecord.uid
    })
    console.log('Successfully created new user:', userRecord.uid);
  }).catch((error) => {
    console.log('Error creating new user:', error);
  });
};

function getAllUsers(){
  firestore.collection("users").get().then((querySnapshot) => {
    usersArray = [];
        querySnapshot.forEach((userDoc) => {
            const user = new User(
                userDoc.id,
                //userDoc.data().location,
                userDoc.data().first_name,
                userDoc.data().type,
                userDoc.data().status
            );

            usersArray.push(user);
        })

    })
    return usersArray;
};

async function banUser(uid){
  //console.log(uid)
  firestore.collection("users").doc(uid).update({status: "Inactive"});
  //await sleep(1000);

};

async function unBanUser(uid){
  firestore.collection("users").doc(uid).update({status: "Active"});
  //await sleep(1000);
};

module.exports = {
  addCharity : addCharity,
  addCharityRep : addCharityRep,
  getAllUsers : getAllUsers,
  banUser : banUser,
  unBanUser : unBanUser
};