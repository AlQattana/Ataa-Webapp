var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')
var charityController = require("../controllers/charityController")

router.get('/', async (req, res) => {
    var usersArray = await usersController.getAllUsers();
    var charitiesArray = await charityController.getAllCharities();
    var reportsArray = await usersController.getAllReports();
    console.log(reportsArray[0].uid);
    res.render('banAccount', {usersArray : usersArray, charitiesArray:charitiesArray, reportsArray:reportsArray});
})

router.get('/ban/:id', async (req, res) => {
    await usersController.banUser(req.params.id);
    res.redirect('/banAccount');
})

router.get('/unban/:id', async (req, res) => {
    await usersController.unBanUser(req.params.id);
    res.redirect('/banAccount');
})

module.exports = router;