var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', async (req, res) => {
    req.session.destroy();
    res.redirect('index');
})

module.exports = router;