const express = require("express");
const router = express.Router();
const db = require("../models");

// HTML routes

// Shelter dashboard home page
router.get("/dashboard", (req, res) => {
  db.Dogs.findAll()
    .then((dogs) => {
      res.render("dashboard", { dogs: dogs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Oops! Something went wrong." });
    });
});

// Page to add a dog
router.get("/dashboard/add", (req, res) => {
  res.render("addDog");
});

//Page to edit a dog
router.get("/dashboard/edit/:id", (req, res) => {
  db.Dogs.findOne({where: {id: req.params.id}})
  .then(dog => {
    res.render("editDog", dog._previousDataValues);
  })
  .catch(err => {
    console.log(err);
  })
  
});

module.exports = router;