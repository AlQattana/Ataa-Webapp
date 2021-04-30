var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');
var usersController = require("../controllers/usersController")

router.get("/", async (req, res) => {
    var charitiesArray = await charityController.getAllCharities();
    res.render("signUpAsRepresentative", {charitiesArray})
});

router.post("/", async (req, res) => {

    var user = {
        email : req.body.email,
        fname : req.body.fname,
        lname : req.body.lname,
        phone : req.body.phone,
        pass : req.body.password,
        charity : req.body.charity
    }
    
    await usersController.addCharityRep(user);
  
    res.send('<h1> Thank you for your registration, we will email you when your account is activated</h1><br><h1><a href=\"index\">Go to home Page</a></h1');
     
})

module.exports = router;