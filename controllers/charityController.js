const admin = require('../admin');
const firebase = require('firebase-admin')
const firestore = firebase.firestore();
const Charity = require("../modules/charity")

// This function returns an array of Charities from the database
module.exports.getAllCharities = async function(){
  var charitiesArray = await firestore.collection("charities").get().then((querySnapshot) => {
    var charitiesArray = [];
    querySnapshot.forEach((charityDoc) => {
        const charity = new Charity(
            charityDoc.id,
            charityDoc.data().location,
            charityDoc.data().name,
            charityDoc.data().specialty,
            charityDoc.data().status
        );
        charitiesArray.push(charity);
    });
    return charitiesArray;
  });
  return charitiesArray;
};

// This function changes the state of charity to "Active"
module.exports.confirmCharity = async function(cid){
    await firestore.collection("charities").doc(cid).update({status: "Active"});
};
  
// This function changes the state of charity to "Rejected"  
module.exports.rejectCharity = async function(cid){
    await firestore.collection("charities").doc(cid).update({status: "Rejected"});
};
