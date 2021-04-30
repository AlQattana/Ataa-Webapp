var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', async (req, res) => {
  res.render('signUp');
})

// About page route.
router.post('/', async (req, res) => {
  var user = {
    email : req.body.email,
    name : req.body.name,
    phone : req.body.phone,
    pass : req.body.password,
  }
 
  await userController.addCharity(user)
  res.send('<h1> Thank you for your registration, we will email you when your account is activated</h1><br><h1><a href=\"index\">Go to home Page</a></h1');
})



module.exports = router;