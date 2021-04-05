const admin = require('../admin');
const firebase = require('firebase-admin')
const firestore = firebase.firestore();
const Charity = require("../modules/charity")
const Donation = require('../modules/donation')
const DonationRequests = require('../modules/donationsRequests')
const CharityStand = require('../modules/charityStand');
const PeriodicDonation = require('../modules/periodicDonation');

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

module.exports.getAllCharityStands = async function(){
  var charityStandsArray = await firestore.collection("charity_stands").get().then((querySnapshot) => {
    var charityStandsArray = [];
    querySnapshot.forEach((charityStandDoc) => {
        const charityStand = new CharityStand(
          charityStandDoc.id,
          charityStandDoc.data().added_by,
          charityStandDoc.data().description,
          charityStandDoc.data().location,
          charityStandDoc.data().status,
          charityStandDoc.data().type
        );
        charityStandsArray.push(charityStand);
    });
    return charityStandsArray;
  });
  return charityStandsArray;
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

module.exports.getAllPeriodicDonations = async function(){
  var periodicDonationArray = await firestore.collection("periodic_donations").get().then((querySnapshot) => {
    var periodicDonationArray = [];
    querySnapshot.forEach((periodicDonationDoc) => {
      const periodicDonation = new PeriodicDonation(
        periodicDonationDoc.id,
        periodicDonationDoc.data().date,
        periodicDonationDoc.data().days,   
        periodicDonationDoc.data().frequency,
        periodicDonationDoc.data().status,
        periodicDonationDoc.data().type,
        periodicDonationDoc.data().uid,
        );
        periodicDonationArray.push(periodicDonation);
    });
    return periodicDonationArray;
  });
  return periodicDonationArray;
};

// This function changes the state of charity to "Active"
module.exports.confirmCharity = async function(cid){
    await firestore.collection("charities").doc(cid).update({status: "Active"});
};
  
// This function changes the state of charity to "Rejected"  
module.exports.rejectCharity = async function(cid){
    await firestore.collection("charities").doc(cid).update({status: "Rejected"});
};

// This function changes the state of charity to "Active"
module.exports.confirmCharityStand = async function(cid){
  await firestore.collection("charity_stands").doc(cid).update({status: "Active"});
};

// This function changes the state of charity to "Rejected"  
module.exports.rejectCharityStand = async function(cid){
  await firestore.collection("charity_stands").doc(cid).update({status: "Rejected"});
};

module.exports.deactivateCharityStand = async function(cid){
  await firestore.collection("charity_stands").doc(cid).update({status: "Inactive"});
};

module.exports.pausePeriodicDonation = async function(cid){
  await firestore.collection("periodic_donations").doc(cid).update({status: "Paused"});
};

module.exports.terminatePeriodicDonation = async function(cid){
  await firestore.collection("periodic_donations").doc(cid).update({status: "Terminated"});
};

module.exports.cancelDonation = async function(uid){
  await firestore.collection("donations").doc(uid).update({status: "canceled"});
};

module.exports.markDonationAsCollected = async function(cid){
  await firestore.collection("donations").doc(cid).update({status: "collected"});
};

module.exports.markDonationRequestAsFulfilled = async function(cid){
  await firestore.collection("donation_requests").doc(cid).update({status: "fulfilled"});
};
