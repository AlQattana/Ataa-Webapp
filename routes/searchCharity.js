var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController')
var charitiesArray = charityController.getAllCharities();



router.get('/', (req, res) => {
  charitiesArray = charityController.getAllCharities();
  res.render("searchCharity", {charitiesArray : charitiesArray})
})

/* // About page route.
router.post('/', (req, res) => {
  //console.log(req.body);
}) */

module.exports = router;