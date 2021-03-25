var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', (req, res) => {
    res.render('adminPage')
})

// About page route.
router.post('/', (req, res) => {

})

module.exports = router;