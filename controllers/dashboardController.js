const express = require("express");
const router = express.Router();
const db = require("../models");
const isAuthenticated = require('../config/isAuthenticated');

// HTML routes

// Shelter dashboard home page
router.get("/dashboard", isAuthenticated, (req, res) => {
  db.Dogs.findAll({
    include: db.Volunteer,
  }).then((dogs) => {
console.log(dogs);
      res.render("dashboard", {dogs: dogs});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).render("errorPage");
    });
});

// Page to add a dog
router.get("/dashboard/add", isAuthenticated, (req, res) => {
  res.render("addDog");
});

//Page to edit a dog
router.get("/dashboard/edit/:id", isAuthenticated, (req, res) => {
  db.Dogs.findOne({where: {id: req.params.id}})
  .then(dog => {
    res.render("editDog", dog._previousDataValues);
  })
  .catch(err => {
    console.log(err);
    res.status(500).render("errorPage");
  })
  
});

module.exports = router;