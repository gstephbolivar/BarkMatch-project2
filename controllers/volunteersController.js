const express = require('express');
const router = express.Router();
const db = require('../models');
const mailer = require('../config/mailer');


//HTML Routes
//User facing home page
router.get("/", (req, res) => {
    res.render("index");
})

//Dog list
router.get("/volunteers/dogalog", (req, res) => {
    db.Dogs.findAll()
    .then(dogs => {
        res.render("doglist", {dogs: dogs});
    })
    .catch(err => {
        console.log(err);
        res.status(500).render("errorPage");
    })
    
})

//Sign Up page
router.get("/volunteers/signup/:id", (req, res) => {
    db.Dogs.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dog => {
        res.render("signUp", {name: dog.name, id: dog.id}); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Oops! Something went wrong."});
    })  
})

//Confirmation page
router.get("/volunteers/confirmation/:id", (req, res) => {
    db.Dogs.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dog => {
        res.render("confirmation", {name: dog.name, img_path: dog.image_path}); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Oops! Something went wrong."});
    })  
})

//API Routes
//Create a volunteer and update dog table with the volunteer id
//and set available to false
router.post("/api/volunteers/signup", (req, res) => {
    const volunteer = req.body;

    db.Volunteer.create(volunteer)
    .then(result => {
        
        db.Dogs.update({VolunteerId: result.dataValues.id, available: false}, {where: {id: req.body.dogId}})
        .then((data) => {

            db.Dogs.findOne({where: {id: req.body.dogId}})
            .then(dog => {
                mailer(dog, result.dataValues);
                res.status(200).json({id: result.dataValues.id});
            })
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Oops! Something went wrong."});
        })       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Oops! Something went wrong."});
    })
});

module.exports = router;