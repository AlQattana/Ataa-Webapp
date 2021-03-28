var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')

router.get('/', async (req, res) => {
    var usersArray = await usersController.getAllUsers()
    res.render('banAccount', {usersArray : usersArray});
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