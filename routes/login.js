var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', (req, res) => {
    res.render('login')
})

// About page route.
router.post('/', (req, res) => {
  //console.log(req.body);
})

module.exports = router;