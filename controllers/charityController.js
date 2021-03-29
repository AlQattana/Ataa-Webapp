const admin = require('../admin');
const firebase = require('firebase-admin')
const firestore = firebase.firestore();
const Charity = require("../modules/charity")
const Donation = require('../modules/donation')
const DonationRequests = require('../modules/donationsRequests')

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

module.exports.getAllDonations = async function(){
  var donationsArray = await firestore.collection("donations").get().then((querySnapshot) => {
    var donationsArray = [];
    querySnapshot.forEach((donationDoc) => {
        const donation = new Donation(
          donationDoc.id,
          donationDoc.data().anonymous,
          donationDoc.data().desc,
          donationDoc.data().image,
          donationDoc.data().location,
          donationDoc.data().notifyAt,          
          donationDoc.data().status,
          donationDoc.data().timeStamp,
          donationDoc.data().type,
          donationDoc.data().user,

        );
        donationsArray.push(donation);
    });
    return donationsArray;
  });
  return donationsArray;
};

module.exports.getAllDonationRequests = async function(){
  var donationRequestsArray = await firestore.collection("donation_requests").get().then((querySnapshot) => {
    var donationRequestsArray = [];
    querySnapshot.forEach((donationRequestDoc) => {
      const donationRequest = new DonationRequests(
          donationRequestDoc.id,
          donationRequestDoc.data().anonymous,
          donationRequestDoc.data().location,   
          donationRequestDoc.data().status,
          donationRequestDoc.data().timeStamp,
          donationRequestDoc.data().type,
          donationRequestDoc.data().uid,

        );
        donationRequestsArray.push(donationRequest);
    });
    return donationRequestsArray;
  });
  return donationRequestsArray;
};

// This function changes the state of charity to "Active"
module.exports.confirmCharity = async function(cid){
    await firestore.collection("charities").doc(cid).update({status: "Active"});
};
  
// This function changes the state of charity to "Rejected"  
module.exports.rejectCharity = async function(cid){
    await firestore.collection("charities").doc(cid).update({status: "Rejected"});
};

module.exports.cancelDonation = async function(uid){
  await firestore.collection("donations").doc(uid).update({status: "canceled"});
};
