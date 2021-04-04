var express = require('express');
var router = express.Router();
const charityConrtoller = require("../controllers/charityController");


// Home page route.
router.get('/', async (req, res) => {
    var periodicDonationsArray = await charityConrtoller.getAllPeriodicDonations();
    res.render('periodicdonation', {periodicDonationsArray:periodicDonationsArray})
})

router.get('/pause/:id', async (req, res) => {
    await charityConrtoller.pausePeriodicDonation(req.params.id)
    res.redirect('/periodicdonation')
})

router.get('/terminate/:id', async (req, res) => {
    await charityConrtoller.terminatePeriodicDonation(req.params.id);
    res.redirect('/periodicdonation')
})

module.exports = router;