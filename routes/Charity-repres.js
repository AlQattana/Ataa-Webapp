var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');
var userController = require('../controllers/usersController');

router.get("/", async (req, res) => {
    
    var charityRepresentativesArray = await charityController.getAllCharityRepresentatives();
    var usersArray = await userController.getAllUsers();
    var charitiesArray = await charityController.getAllCharities();

    res.render("Charity-repres", {charityRepresentativesArray : charityRepresentativesArray, usersArray : usersArray, charitiesArray : charitiesArray});
});

router.get('/accept/:id', async (req, res) => {
    await charityController.acceptCharityRepresentative(req.params.id);
    res.redirect('/Charity-repres');
    
})

router.get('/reject/:id', async (req, res) => {
    await charityController.rejectCharityRepresentative(req.params.id);
    res.redirect('/Charity-repres');
})

module.exports = router;