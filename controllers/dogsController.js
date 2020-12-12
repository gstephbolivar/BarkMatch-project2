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

// Page to see all dogs
router.get("/dogs", function(req, res) {
    db.Dogs.findAll({}).then((allDogs) => {
        let hbsObject = {
            dogs: allDogs,
        };

        res.render("doglist", hbsObject);
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

//Create a dog
router.post("/api/dogs", (req, res) => {
    
    const dog = req.body;

    //Create dog in the database
    db.Dogs.create(dog)
    .then(result => {

        //Check to see if a picture was included in the request and then add it to 
        //the dogs image folder and update the image path in the database
        if(req.files && req.files.img_path){

            const picture = req.files.img_path;

            picture.mv(`public/assets/images/dogs/${dog.name}-${result.dataValues.id}.jpg`, function(err) {
                if (err){
                  console.log(err);
                  return res.status(500).json(err);
                }
            
                const imagePath = `assets/images/dogs/${dog.name}-${result.dataValues.id}.jpg`

                db.Dogs.update({img_path: imagePath}, { where: {id: result.dataValues.id}})
                .then(result => {

                    if(result.affectedRows > 0){
                        res.status(200).json({id: result.dataValues.id, image: imagePath});
                    }

                    if(result.affectedRows === 0){
                        res.status(404);
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })                
            });     
        }
        else{

            db.Dogs.update({img_path: "/assets/images/img/dogph.png"}, { where: {id: result.dataValues.id}})
            .then(result => {

                if(result.affectedRows > 0){
                    res.status(200).json({id: result.dataValues.id});
                }

                if(result.affectedRows === 0){
                    res.status(404);
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