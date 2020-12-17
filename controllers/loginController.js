// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const express = require("express");
const router = express.Router();


router.get("/login", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
      res.redirect("/dashboard");
  }

  res.render('login');
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    username: req.user.username,
    id: req.user.id,
  });
});


// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      id: req.user.id,
      name: req.user.name
    });
  }
});


module.exports = router;
