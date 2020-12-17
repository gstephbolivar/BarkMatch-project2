const express = require('express');
const router = express.Router();
const db = require('../models');
const fs = require('fs');
const path = require('path');


//HTML Routes
// Page to see all dogs
router.get("/dogs", function (req, res) {
    db.Dogs.findAll({})
    .then((allDogs) => {
        let hbsObject = {
            dogs: allDogs,
        };

        res.render("doglist", hbsObject);
    })
    .catch(err => {
        console.log(err);
        res.status(500).render("errorPage");
    })

});




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

router.get("/api/dogs/filter", (req, res) => {

    const query = {};
    if(req.query.gender){
        query.gender = req.query.gender;
    }

    if(req.query.size){
        query.size = req.query.size;
    }

    if(req.query.energy_level){
        query.energy_level = req.query.energy_level;
    }

    db.Dogs.findAll({
        where: query
    })
        .then(dog => {
            res.json(dog);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

//Get one dog dog
router.get("/api/dogs/:id", (req, res) => {
    db.Dogs.findAll({
        where: { id: req.params.id }
    })
        .then(dog => {
            res.json(dog);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

//Create a dog
router.post("/api/dogs", (req, res) => {

    const dog = req.body;

    //Create dog in the database
    db.Dogs.create(dog)
        .then(result => {


            //Check to see if a picture was included in the request and then add it to 
            //the dogs image folder and update the image path in the database
            if (req.files && req.files.img_path) {

                const picture = req.files.img_path;
                const dogImagePath = `/assets/images/dogs/Dog-${result.dataValues.id}.jpg`

                picture.mv(`public` + dogImagePath, function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }

                    db.Dogs.update({ img_path: dogImagePath }, { where: { id: result.dataValues.id } })
                        .then(result => {

                            if (result[0] === 1) {
                                res.status(200).end();
                            }

                            if (result[0] === 0) {
                                res.status(404).end();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json(err);
                        })
                });
            }
            else {

                db.Dogs.update({ img_path: "/assets/images/img/dogph.png" }, { where: { id: result.dataValues.id } })
                    .then(result => {

                        if (result[0] === 1) {
                            res.status(200).end();
                        }

                        if (result[0] === 0) {
                            res.status(404).end();
                        }
                    })
                    .catch(err => {

                        console.log(err);
                        res.status(500).json(err);
                    })
            }
        })
        .catch(err => {

            console.log(err);
            res.status(500).json(err);
        })
});

//Update a dog
router.put("/api/dogs/:id", (req, res) => {
    const dog = req.body;
    if (dog.flag){    
    dog.VolunteerId = null;
    };
    db.Dogs.update(dog, { where: { id: req.params.id } })
        .then(result => {

            if (result[0] === 1) {
                if (req.files && req.files.img_path) {

                    const picture = req.files.img_path;

                    picture.mv(`public/assets/images/dogs/Dog-${req.params.id}.jpg`, function (err) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }

                        res.status(200).end();    

                    });
                } else {
                    res.status(200).end();
                }
            }else{
                res.status(404).end();
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

//Delete a dog
router.delete("/api/dogs/:id", (req, res) => {
    db.Dogs.findOne({where: {id: req.params.id}})
    .then(dog => {
        deleteFile(dog.img_path);

        db.Dogs.destroy({ where: { id: req.params.id } })
        .then(result => {
            if (result > 0) {
                return res.status(200).end();
            }

            if (result === 0) {
                return res.status(404).end();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

function deleteFile(file){
    const dogFile = path.basename(file);
    const dogImagePath = "./public/assets/images/dogs/" + dogFile;
    fs.access(dogImagePath, (err) => {
        if(err){
            if(err.code === "ENOENT"){
                return;
            }
        }

        fs.unlink(dogImagePath, (err) => {
            if(err){
                console.log(err);
            }
            console.log(dogImagePath + " deleted.");
        });
    })
}

module.exports = router;