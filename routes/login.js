var express = require('express');
var router = express.Router();
const loginController = require("../controllers/loginController");

// Home page route.
router.get('/', (req, res) => {
    res.render('login')
})

// About page route.
router.post('/', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
  
  loginController.signIn(email, password)
  res.send("x")
})

module.exports = router;