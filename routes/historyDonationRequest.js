var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');
var usersController = require("../controllers/usersController")

router.get("/", async (req, res) => {
    var donationsArray = await charityController.getAllDonations();
    var donationRequestsArray = await charityController.getAllDonationRequests();
    var usersArray = await usersController.getAllUsers();
    //console.log(donationsArray[0].timeStamp)
    res.render("historyDonationRequest", {donationsArray:donationsArray, donationRequestsArray:donationRequestsArray, usersArray:usersArray});
});

module.exports = router;
