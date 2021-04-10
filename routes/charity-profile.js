var express = require('express');
var router = express.Router();

router.get("/", async (req, res) => {

    res.render("charity-profile");
});

module.exports = router;