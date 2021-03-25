var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')
var usersArray = usersController.getAllUsers()

router.get('/', (req, res) => {
    usersArray = usersController.getAllUsers()
    res.render('banAccount', {usersArray : usersArray});
})

router.get('/ban/:id', (req, res) => {
    //console.log(req.params.id);
    usersController.banUser(req.params.id);
    res.redirect('/banAccount');
    
})

router.get('/unban/:id', (req, res) => {
    //console.log(req.params.id);
    usersController.unBanUser(req.params.id);
    res.redirect('/banAccount');
    
})

module.exports = router;