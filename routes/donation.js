var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController')

router.get('/', async (req, res) => {
    var donationsArray = await charityController.getAllDonations()
    res.render('donation', {donationsArray : donationsArray});
})

router.get('/cancel/:id', async (req, res) => {
    console.log(req.params.id);
    await charityController.cancelDonation(req.params.id);
    res.redirect('/donation');
})

module.exports = router;