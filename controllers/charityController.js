const admin = require('../admin');
const firebase = require('firebase-admin')
const firestore = firebase.firestore();
const Charity = require("../modules/charity")
var charitiesArray = [];


function getAllCharities(){
    firestore.collection("charities").get().then((querySnapshot) => {
        charitiesArray = [];
        querySnapshot.forEach((charityDoc) => {
            const charity = new Charity(
                charityDoc.id,
                charityDoc.data().location,
                charityDoc.data().name,
                charityDoc.data().specialty,
                charityDoc.data().status
            );

            charitiesArray.push(charity);

        })
    })
    return charitiesArray;
}

async function confirmCharity(cid){
    //console.log(uid)
    firestore.collection("charities").doc(cid).update({status: "Active"});
    //await sleep(1000);
  
  };
  
  async function rejectCharity(cid){
    firestore.collection("charities").doc(cid).update({status: "Rejected"});
    //await sleep(1000);
  };

module.exports = {
    getAllCharities,
    confirmCharity,
    rejectCharity
}