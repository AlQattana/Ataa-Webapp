var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');
var userController = require('../controllers/usersController');

router.get("/:id", async (req, res) => {

    
    var donationRequest = await charityController.getDonationRequestById(req.params.id)
    
    var user = await userController.getUserById(donationRequest.uid);
    

    res.render("Charity-PendingRequestInfo", {donationRequest:donationRequest, user:user});
});

router.get("/:id/accept", async (req, res) => {
    await charityController.acceptDonationRequest(req.params.id);
    res.redirect('/Charity-PendingRequest');
});

module.exports = router;