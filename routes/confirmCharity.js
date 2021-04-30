var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');
var usersController = require('../controllers/usersController')

router.get('/', async (req, res) => {
    var charitiesArray = await charityController.getAllCharities();
    res.render('confirmCharity', {charitiesArray : charitiesArray})
})

router.get('/confirm/:id', async (req, res) => {
    await charityController.confirmCharity(req.params.id);
    await usersController.confirmUser(req.params.id)
    res.redirect('/confirmCharity');
    
})

router.get('/reject/:id', async (req, res) => {
    await charityController.rejectCharity(req.params.id);
    await usersController.rejectUser(req.params.id);
    res.redirect('/confirmCharity');
})

module.exports = router;
