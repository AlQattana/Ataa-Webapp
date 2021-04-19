var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get("/", async (req, res) => {
    var donationRequestsArray = await charityController.getAllDonationRequests();
    var count = 0;
    donationRequestsArray.forEach(element => {
        if (element.status == "pending")
            count++;
    });
    res.render("Charity-Agent", {count:count});
});

module.exports = router;