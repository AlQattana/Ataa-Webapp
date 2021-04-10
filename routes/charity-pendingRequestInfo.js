var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');
var userController = require('../controllers/usersController');

router.get("/:id", async (req, res) => {

    
    var donationRequest = await charityController.getDonationRequestById(req.params.id)
    //console.log(donationRequest.uid);
    var user = await userController.getUserById(donationRequest.uid);
    //console.log(user.name);

    res.render("Charity-PendingRequestInfo", {donationRequest:donationRequest, user:user});
});

module.exports = router;