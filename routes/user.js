const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middileware.js")
const userController = require("../controllers/user.js")

router.route("/signup")
.get(userController.renderSignup)
.post(wrapasync(userController.signup));

router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

router.get("/logout", userController.logout);

module.exports = router;