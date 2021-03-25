var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController')

// Home page route.
router.get('/', (req, res) => {
    res.render('signUp');
})

// About page route.
router.post('/', (req, res) => {
  
  var user = {
    email : req.body.email,
    name : req.body.name,
    phone : req.body.phone,
    pass : req.body.password,
  }
  
  var role = req.body.signupas

  if (role === "Charity") {
    userController.addCharity(user)
  } else {
    userController.addCharityRep(user)
  }

  res.redirect('login');
})



module.exports = router;