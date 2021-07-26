const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", passport.authenticate("signup", { session: false }), userController.signup);

router.post("/signin", userController.signin);

router.post("/", userController.add);

module.exports = router;
