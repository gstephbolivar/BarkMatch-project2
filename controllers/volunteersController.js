const express = require("express");
const router = express.Router();
const db = require('../models');
const mailer = require('../config/mailer');


//HTML Routes
//User facing home page
router.get("/", (req, res) => {
  res.render("index");
});

//Dog list
router.get("/volunteers/dogalog", (req, res) => {
  db.Dogs.findAll()
    .then((dogs) => {
      res.render("doglist", { dogs: dogs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).render("errorPage");
    });
});

router.get("/volunteers/dogalog/:gender/:size/:energy", function (req, res) {
  let gender = req.params.gender;
  let size = req.params.size;
  let energy = req.params.energy;

  if (gender === "All" && size === "All" && energy === "All"){
      gender = ["Male", "Female"];
      size = ["Small", "Medium", "Large"];
      energy = ["Low","Moderate", "High"];
  } else if (gender === "All" && size === "All"){
      gender = ["Male", "Female"];
      size = ["Small", "Medium", "Large"];
  } else if (energy === "All" && size === "All"){
      energy = ["Low","Moderate", "High"];
      size = ["Small", "Medium", "Large"];
  } else if (energy === "All" && gender === "All"){
      energy = ["Low","Moderate", "High"];
      gender = ["Male", "Female"];
  } else if (energy === "All"){
      energy = ["Low","Moderate", "High"];
  } else if (size === "All"){
      size = ["Small", "Medium", "Large"];
  } else {
      gender = ["Male", "Female"];
  }
  db.Dogs.findAll({where: {
      gender: gender,
      size: size,
      energy_level: energy,
  }})
  .then((filteredDogs) => {
      let hbsObject = {
          dogs: filteredDogs,
      };

      res.render("doglist", hbsObject);
  })
  .catch(err => {
      console.log(err);
      res.status(500).render("errorPage");
  })
  
});

//Sign Up page
router.get("/volunteers/signup/:id", (req, res) => {
  db.Dogs.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dog) => {
      res.render("signUp", { name: dog.name, id: dog.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Oops! Something went wrong." });
    });
});

//Confirmation page
router.get("/volunteers/confirmation/:id/:dogId", (req, res) => {
  db.Dogs.findOne({
    where: {
      id: req.params.dogId,
    },
  })
    .then((dog) => {
      db.Volunteer.findOne({
        where: {
          id: req.params.id,
        },
      }).then((volunteer) => {
        res.render("confirmation", {
          volunteerName: volunteer.name,
          dogName: dog.name,
          img_path: dog.img_path,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Oops! Something went wrong." });
    });
});

//API Routes
//Create a volunteer and update dog table with the volunteer id
//and set available to false
router.post("/api/volunteers/signup", (req, res) => {
  const volunteer = req.body;

  db.Volunteer.create(volunteer)
    .then((result) => {
      console.log(result);
      db.Dogs.update(
        { VolunteerId: result.dataValues.id, available: false },
        { where: { id: req.body.dogId } }
      )
        .then((data) => {
          db.Dogs.findOne({
            where: {
              id: req.body.dogId,
            },
          }).then((dog) => {
            mailer(dog, result.dataValues)
            res
              .status(200)
              .json({ dog: dog, volunteerId: result.dataValues.id });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Oops! Something went wrong." });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Oops! Something went wrong." });
    });
});

module.exports = router;
