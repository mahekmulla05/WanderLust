const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.renderSignupForm)   //signup form
    .post(wrapAsync(userController.signup));   //signup

router.route("/login")
    .get(userController.renderLoginForm)   //login form
    .post(
    saveRedirectUrl,
    passport.authenticate("local", { 
        failureRedirect: '/login', 
        failureFlash: true
    }), 
    userController.login);   //login

//logout
router.get("/logout", userController.logout);

module.exports = router;