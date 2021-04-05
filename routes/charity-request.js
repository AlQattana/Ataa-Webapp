var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get("/", async (req, res) => {
    
    var donationRequestsArray = await charityController.getAllDonationRequests();
    res.render("charity-request", {donationRequestsArray:donationRequestsArray});
});

router.get('/fulfill/:id', async (req, res) => {
    console.log(req.params.id);
    await charityController.markDonationRequestAsFulfilled(req.params.id);
    res.redirect('/charity-request');
})

module.exports = router;