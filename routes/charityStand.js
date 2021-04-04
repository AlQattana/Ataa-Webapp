var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get('/', async (req, res) => {
    var charityStandsArray = await charityController.getAllCharityStands();
    res.render('charityStand', {charityStandsArray : charityStandsArray})
})

router.get('/confirm/:id', async (req, res) => {
    await charityController.confirmCharityStand(req.params.id);
    res.redirect('/charityStand');
    
})

router.get('/reject/:id', async (req, res) => {
    await charityController.rejectCharityStand(req.params.id);
    res.redirect('/charityStand');
})

module.exports = router;



