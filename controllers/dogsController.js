const express = require('express');
const router = express.Router();
const db = require('../models');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary');
const formidable = require('formidable');


cloudinary.config({
    cloud_name: 'barkmatch',
    api_key: '292339498943787',
    api_secret: 'xnckMtU9yzU_0EX_Se-B_Adfb10'
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

// filter dogs
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
router.post("/api/dogs", (req, res, next) => {

    const dog = req.body;
    const defaultImage = "/assets/images/img/dogph.png";
    let imagePath;
    let file;

    if (req.files && req.files.img_path) {
        file = req.files.img_path;
        imagePath = `.\\tmp\\${file.name}`       
    }
    
    if(file){
        file.mv(imagePath, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
    
            cloudinary.v2.uploader.upload(imagePath, {upload_preset: "ml_default"}, (err, result) => {
                if(err){
                    console.log(err);
                    return res.status(500).json(err);
                }
                dog.img_path = result.url;
                db.Dogs.create(dog)
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })
            }).then(() => {
               fs.unlink(imagePath, () => {
                   console.log("Removing " + imagePath);
               });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })          
        });
    }else{
        dog.img_path = defaultImage;
        db.Dogs.create(dog)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
});

//Update a dog
router.put("/api/dogs/:id", (req, res) => {
    const dog = req.body;
    if (dog.flag){    
    dog.VolunteerId = null;
    };

    let imagePath;
    let file;

    if (req.files && req.files.img_path) {
        file = req.files.img_path;
        imagePath = `.\\tmp\\${file.name}`       
    }

    if(file){
        file.mv(imagePath, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
    
            cloudinary.v2.uploader.upload(imagePath, {upload_preset: "ml_default"}, (err, result) => {
                if(err){
                    console.log(err);
                    return res.status(500).json(err);
                }
                dog.img_path = result.url;
                db.Dogs.update(dog, { where: { id: req.params.id } })
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).end();
                })
            }).then(() => {
               fs.unlink(imagePath, () => {
                   console.log("Removing " + imagePath);
               });
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            })          
        });
    }else{
        db.Dogs.update(dog, { where: { id: req.params.id } })
        .then(() => {
            res.status(200).end();
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
    }
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