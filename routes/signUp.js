var express = require('express');
var router = express.Router();
const admin = require('../admin');

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


admin.createUser(user);
res.render('login');

})



module.exports = router;