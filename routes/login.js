var express = require('express');
var router = express.Router();
const loginController = require("../controllers/loginController");
const usersController = require("../controllers/usersController");
//const session = require('express-session');


// Home page route.
router.get('/', (req, res) => {
  res.render('login')
})

// About page route.
router.post('/', async (req, res) => {
  
  var email = req.body.email;
  var password = req.body.password;
  
  var user = await loginController.signIn(email, password);

  
  if(user == 0 || user == undefined){
    res.send('<h1>Error logging in<h1>');
    
  } else {
    console.log(user.uid)
    user = await usersController.getUserById(user.uid);
    req.session.type = user.type;
    console.log(req.session.type);
    res.send('<h1>Loged in ...<h1>');
  }
})

module.exports = router;