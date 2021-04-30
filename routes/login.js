var express = require('express');
var router = express.Router();
const loginController = require("../controllers/loginController");
const usersController = require("../controllers/usersController");
//const session = require('express-session');


// Home page route.
router.get('/', (req, res) => {
  if(req.session.type){
    if(req.session.type == "admin") {
      res.redirect("adminPage");
    } else {
      res.redirect("Charity-Agent");
    }
  } else {
    res.render('login')
  }
  
})

// About page route.
router.post('/', async (req, res) => {
  
  var email = req.body.email;
  var password = req.body.password;
  
  var user = await loginController.signIn(email, password);

  
  if(user != undefined){
    
    user = await usersController.getUserById(user.uid);
    
    user_status = user.status;
    if(user_status.toLowerCase() != "active"){
      res.send("Your account is not activated yet ...")
    } else {
      req.session.type = user.type;
      if(user.type == "admin"){
        res.redirect("adminPage");
      } 
      else if(user.type == "charity" || user.type == "charityAgent") {
        res.redirect("Charity-Agent");
      }
      else {
        res.send("Unauthorized Access");
      }
    }
  } else {
    res.send('<h1>Error logging in, either username or password are wrong ...<h1>');
  }
})

module.exports = router;