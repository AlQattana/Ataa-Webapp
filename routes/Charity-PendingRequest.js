var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get("/", async (req, res) => {
    
    var donationRequestsArray = await charityController.getAllDonationRequests();
    res.render("Charity-PendingRequest", {donationRequestsArray:donationRequestsArray});
});

router.get('/accept/:id', async (req, res) => {
    await charityController.acceptDonationRequest(req.params.id);
    res.redirect('/Charity-PendingRequest');
    
})

router.get('/reject/:id', async (req, res) => {
    await charityController.rejectDonationRequest(req.params.id);
    res.redirect('/Charity-PendingRequest');
})

module.exports = router;