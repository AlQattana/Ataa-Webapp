var express = require('express');
var router = express.Router();
const loginController = require("../controllers/loginController");
//const session = require('express-session');


// Home page route.
router.get('/', (req, res) => {
  var uid = req.session.uid;
  console.log(uid);
  res.render('login')
})

// About page route.
router.post('/', async (req, res) => {
  
  var email = req.body.email;
  var password = req.body.password;
  
  var user = await loginController.signIn(email, password);
  //console.log(user.uid);
  
  if(user == 0 || user == undefined){
    res.send('<h1>Error logging in<h1>');
    
  } else {
    //console.log('1');
    res.render('Charity-Agent');
  }

  
  

})

module.exports = router;