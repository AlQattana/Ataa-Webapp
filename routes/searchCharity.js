var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController')

router.get('/', async (req, res) => {
  var charitiesArray = await charityController.getAllCharities();
  res.render("searchCharity", {charitiesArray : charitiesArray})
})

/* // About page route.
router.post('/', (req, res) => {
  //console.log(req.body);
}) */

module.exports = router;