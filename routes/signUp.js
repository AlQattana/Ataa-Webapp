var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController')
const charityController = require('../controllers/charityController')

// Home page route.
router.get('/', async (req, res) => {
  var charitiesArray = await charityController.getAllCharities();
  res.render('signUp', {charitiesArray:charitiesArray});
})

// About page route.
router.post('/', (req, res) => {
  
  
  
  var user = {
    email : req.body.email,
    name : req.body.name,
    phone : req.body.phone,
    pass : req.body.password,
    charity : req.body.charity
  }
 
  
  if (charity != "")
    userController.addCharityRep(user)
  else
    userController.addCharity(user)
/*   var role = req.body.signupas

  if (role === "Charity") {
    userController.addCharity(user)
  } else {
    userController.addCharityRep(user)
  } */

  res.redirect('login');
})



module.exports = router;