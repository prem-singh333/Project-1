const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
    res.render("user/signup.ejs")
}

module.exports.signup = async (req, res) => {

    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const register = await User.register(newUser, password);
        req.login(register, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust!");
        res.redirect("/listings")
        })
    }
    catch (e) {
        req.flash("error", e.message)
        res.redirect("/signup")
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("user/login.ejs")
}

module.exports.login = async(req, res) => {
    req.flash("success","Welcome to Wanderlust! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err){
            next(err)
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
}