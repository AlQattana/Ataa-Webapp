var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');
var charitiesArray = charityController.getAllCharities();

router.get('/', (req, res) => {
    var charitiesArray = charityController.getAllCharities();
    res.render('confirmCharity', {charitiesArray : charitiesArray})
})

router.get('/confirm/:id', (req, res) => {
    //console.log(req.params.id);
    charityController.confirmCharity(req.params.id);
    res.redirect('/confirmCharity');
    
})

router.get('/reject/:id', (req, res) => {
    //console.log(req.params.id);
    charityController.rejectCharity(req.params.id);
    res.redirect('/confirmCharity');
    
})

module.exports = router;
