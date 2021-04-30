var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');
var userController = require('../controllers/usersController');

router.get("/", async (req, res) => {
    if(req.session.type == "charityAgent" || req.session.type == "charity") {
        var charityRepresentativesArray = await charityController.getCharityRepresentativesById(req.session.cid);
        var usersArray = await userController.getAllUsers();
        res.render("Charity-repres", {charityRepresentativesArray, usersArray});
    } else {
        res.send("<h1>Unauthorized Access</h1>")
    }

});

router.get('/accept/:id', async (req, res) => {
    await charityController.acceptCharityRepresentative(req.params.id);
    await userController.confirmUser(req.params.id);
    res.redirect('/Charity-repres');
    
})

router.get('/reject/:id', async (req, res) => {
    await charityController.rejectCharityRepresentative(req.params.id);
    await userController.rejectUser(req.params.id);
    res.redirect('/Charity-repres');
})

module.exports = router;