const admin = require('../admin');
const firebase = require('firebase-admin');
const firestore = firebase.firestore();
const User = require('../modules/user');
const Report = require('../modules/report')

module.exports.addCharity = async function(charity){
  await admin.auth().createUser({
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

module.exports.addCharityRep = async function(charityRep){
  await admin.auth().createUser({
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

module.exports.getAllUsers = async function getAllUsers(){
  var userArray = await firestore.collection("users").get().then((querySnapshot) => {
      var usersArray = [];
        querySnapshot.forEach((userDoc) => {
            const user = new User(
                userDoc.id,
                //userDoc.data().location,
                (userDoc.data().first_name + ' ' + userDoc.data().last_name),
                userDoc.data().type,
                userDoc.data().status,
                userDoc.data().uid
            );

            usersArray.push(user);
        });
      return usersArray;
    });
  return userArray;
};

module.exports.banUser = async function(uid){
  await firestore.collection("users").doc(uid).update({status: "banned"});
};

module.exports.unBanUser = async function(uid){
  await firestore.collection("users").doc(uid).update({status: "Active"});
  //await sleep(1000);
};

module.exports.getUserById = async function(id){
  //console.log(id);
  
  const usersRef = firestore.collection('users');
  const snapshot = await usersRef.where('uid', '==', id).get();
  
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  
  var u;

  snapshot.forEach(userDoc => {
    const user = new User(
      userDoc.id,
      //userDoc.data().location,
      (userDoc.data().first_name + ' ' + userDoc.data().last_name),
      userDoc.data().type,
      userDoc.data().status,
      userDoc.data().uid
    );
    u = user;
  });

  return u;
};

module.exports.addReport = async function(cid, uid, description){
    await firestore.collection('Reports').add({
      cid: cid,
      description: description,
      uid: uid
    });
};

module.exports.getAllReports = async function(){
  var reportsArray = await firestore.collection("Reports").get().then((querySnapshot) => {
      var reportsArray = [];
        querySnapshot.forEach((reportDoc) => {
            const report = new Report(
              reportDoc.id,
              reportDoc.data().cid,
              reportDoc.data().uid,
              reportDoc.data().description
            );
            
            reportsArray.push(report);
        });
      return reportsArray;
    });
  return reportsArray;
};

