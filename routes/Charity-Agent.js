var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get("/", async (req, res) => {
    res.render("Charity-Agent");
});

module.exports = router;