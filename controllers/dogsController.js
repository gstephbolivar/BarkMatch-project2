const express = require('express');
const router = express.Router();
const db = require('../models');


//HTML Routes
//Page to add a dog
router.get("/add", (req, res) => {
    res.render("addDog");
})

//Page to edit a dog
router.get("/edit", (req, res) => {
    res.render("editDog");
})

//API Routes
//Get all the dogs
router.get("/api/dogs", (req, res) => {
    db.Dogs.findAll()
    .then(dogs => {
        res.json(dogs);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

//Create a dog
router.post("/api/dogs", (req, res) => {
    const dog = req.body;

    db.Dogs.create(dog)
    .then(result => {
        res.status(200).json({id: result.insertId});
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

//Update a dog
router.put("/api/dogs/", (req, res) => {
    db.Dogs.update(req.body, {where:{id: req.body.id}})
    .then(result => {
        if(result.affectedRows > 0){
            return res.status(200).json(result);
        }

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Dog not found in the database."});
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

//Delete a dog
router.delete("/api/dogs/:id", (req, res) => {
    db.Dogs.destroy({ where: {id: req.params.id} })
    .then(result => {
        if(result.affectedRows > 0){
            return res.status(200).json(result);
        }

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Dog not found in the database."});
        }
    })
})

module.exports = router;