var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get("/", async (req, res) => {
    
    var donationsArray = await charityController.getAllDonations();
    res.render("charity-donations", {donationsArray:donationsArray});
});

router.get('/collect/:id', async (req, res) => {
    console.log(req.params.id);
    await charityController.markDonationAsCollected(req.params.id);
    res.redirect('/charity-donations');
})

module.exports = router;