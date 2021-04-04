var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get("/", (req, res) => {
    res.render("EditCharityStand");
});

router.get('/:id', async (req, res) => {
    var charityStandsArray = await charityController.getAllCharityStands();
    var charityStand;
    charityStandsArray.forEach(c => {
        if(c.id === req.params.id){
            charityStand = c;
        }
    })
    res.render('EditCharityStand', {charityStand : charityStand});
})

router.get('/deactivate/:id', async (req, res) => {
    await charityController.deactivateCharityStand(req.params.id);
    res.redirect('/charityStand');
})

module.exports = router;
