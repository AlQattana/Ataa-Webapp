var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    res.render("charity-notify");    
})



module.exports = router;