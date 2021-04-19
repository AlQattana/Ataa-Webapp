var express = require('express');
var router = express.Router();
var userController = require("../controllers/usersController")

router.get("/:id", async (req, res) => {
    var user = await userController.getUserById(req.params.id);
    res.render("charity-reportAccount", {user:user});
});

router.post("/:id", async (req, res) => {
    
    var uid = req.params.id;
    var description = req.body.description;
    await userController.addReport("YBTaDUtap9fNx3QJZL44", uid, description);
    res.redirect("/Charity-PendingRequest");
});

module.exports = router;