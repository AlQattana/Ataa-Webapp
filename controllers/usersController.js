const admin = require('../admin');
const firebase = require('firebase-admin');
const firestore = firebase.firestore();
const User = require('../modules/user');
const Report = require('../modules/report')

module.exports.addCharity = async function(user){
  await admin.auth().createUser({
    email: user["email"],
    emailVerified: false,
    phoneNumber: user["phone"],
    password: user["pass"],
    displayName: user["name"],
    disabled: false,
  }).then((userRecord) => {
    
    firestore.collection('charities').doc(userRecord.uid).set({
      cid : userRecord.uid,
      location: null,
      name: user["name"],
      specialty: null,
      status: "pending"
    });

    firestore.collection('users').doc(userRecord.uid).set({
      addressLine: null,
      brithdate: null,
      email: user["email"],
      first_name: user["name"],
      last_name: null,
      geoPoint: null,
      pantsSize : null,
      private : null,
      shirtSize: null,
      shoeSize : null,
      status : "pending",
      type : "charity",
      uid : userRecord.uid,
      cid : userRecord.uid
    })

    console.log('Successfully created new user:', userRecord.uid);
  }).catch((error) => {
    console.log('Error creating new user:', error);
  });
};

module.exports.addCharityRep = async function(user){
  await admin.auth().createUser({
    email: user["email"],
    emailVerified: false,
    phoneNumber: user["phone"],
    password: user["pass"],
    displayName: (user["fname"] + " " + user["lname"]),
    disabled: false,
  }).then((userRecord) => {
    
    firestore.collection('charity_representatives').doc(userRecord.uid).set({
      cid : user["charity"],
      uid : userRecord.uid,
      status: "pending"
    });

    firestore.collection('users').doc(userRecord.uid).set({
      addressLine: null,
      brithdate: null,
      email: user["email"],
      first_name: user["fname"],
      last_name: user["lname"],
      geoPoint: null,
      pantsSize : null,
      private : null,
      shirtSize: null,
      shoeSize : null,
      status : "pending",
      type : "charityAgent",
      uid : userRecord.uid,
      cid : user["charity"]
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
              userDoc.data().addressLine,
              userDoc.data().brithdate,
              userDoc.data().email,
              userDoc.data().first_name,
              userDoc.data().last_name,
              userDoc.data().geoPoint,
              userDoc.data().pantsSize,
              userDoc.data().private,
              userDoc.data().shirtSize,
              userDoc.data().shoeSize,
              userDoc.data().status,
              userDoc.data().type,
              userDoc.data().uid,
              userDoc.data().cid
            );

            usersArray.push(user);
        });
      return usersArray;
    });
  return userArray;
};

module.exports.confirmUser = async function(uid){
  await firestore.collection("users").doc(uid).update({status: "active"});
};

module.exports.rejectUser = async function(uid){
  await firestore.collection("users").doc(uid).update({status: "rejected"});
};

module.exports.banUser = async function(uid){
  await firestore.collection("users").doc(uid).update({status: "banned"});
};

module.exports.unBanUser = async function(uid){
  await firestore.collection("users").doc(uid).update({status: "Active"});
  //await sleep(1000);
};

module.exports.getUserById = async function(id){
  var user;
  
  const usersRef = firestore.collection('users');
  const snapshot = await usersRef.where('uid', '==', id).get();
  
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  snapshot.forEach((userDoc) => {
    var userTemp = new User(
        userDoc.id,
        userDoc.data().addressLine,
        userDoc.data().brithdate,
        userDoc.data().email,
        userDoc.data().first_name,
        userDoc.data().last_name,
        userDoc.data().geoPoint,
        userDoc.data().pantsSize,
        userDoc.data().private,
        userDoc.data().shirtSize,
        userDoc.data().shoeSize,
        userDoc.data().status,
        userDoc.data().type,
        userDoc.data().uid,
        userDoc.data().cid
    );
    user = userTemp;  
  });

  return user;
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

