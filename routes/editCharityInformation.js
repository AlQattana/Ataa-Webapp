var express = require('express');
var router = express.Router();
var charityController = require('../controllers/charityController');

router.get("/", (req, res) => {
    res.render("editCharityInformation");
});

router.get('/:id', async (req, res) => {
    var charitiesArray = await charityController.getAllCharities();
    var charity;
    charitiesArray.forEach(c => {
        if(c.id === req.params.id){
            charity = c;
        }
    })
    res.render('editCharityInformation', {charity : charity});
})

module.exports = router;
