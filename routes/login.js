var express = require('express');
var router = express.Router();
const loginController = require("../controllers/loginController");
const cookie = require('cookie-parser');


// Home page route.
router.get('/', (req, res) => {
    if(!req.session)
      res.render('login')
})

// About page route.
router.post('/', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  
  var user = await loginController.signIn(email, password);
  
  if(user != 0 | user == undefined){}

})

module.exports = router;