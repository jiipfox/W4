const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const Category = require("./models/Category");
const Image = require("./models/Image");
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/', storage:storage })
const fs = require('fs');


const app = express();
const path = require("path");
const port = 1234;

//const mongoDB = "mongodb://localhost:27017/recipedb";
const mongoDB = "mongodb://localhost:27017/testdb";
// CANNOT NOT
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongdoDB error!!!!!!!!!!!!!!!!"));


app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));
let recipeJson = "";


app.get("/", function (req, res) {

});

app.get("/diets/", function (req, res) {
    console.log("Diets page loaded, find all diets!");
    Category.find({}, function(err, result) {
        if (err) throw err;
        if (result) {
            console.log("Yes found.");
            return res.json(result)
        } else {
            console.log("No found.");
            return res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    })
});

app.get("/recipe/:food", (req, res, next) => {
    console.log("etsi reseptiä: " + req.params.food);

    Recipe.findOne({ name: req.params.food }, (err, recipe) => {
        if (err) {
            return next(err);
        }
        if (recipe) {
            console.log("LÖYTYI!");
            return res.send(recipe);
        }
        else{
            console.log("EI - !");
            return res.status(404).send(`Recipe name ${req.params.food} not found!`);
        }
    })
});


app.post('/test/', function (req, res, next) { // next object helps error handling?
    Category.findOne({ name: req.body.name}, (err, name) => {
        if (err) return next(err);
        if(!name){
            console.log("POST diet, no exists");
            new Category({
                name: req.body.name,
            }).save((err) => {
                if(err){
                    return next(err);
                } 
                return res.send(req.body);
            });
        } else{
            console.log("POST diet, already exists");
        } // no need to else as we feed this everythyme
    });
  })


app.post('/recipe/', function (req, res, next) { // next object helps error handling?
    // Checks if we have the recipe already
    Recipe.findOne({ name: req.body.name}, (err, name) => {
        if (err) return next(err);
        if(!name){
            new Recipe({
                name: req.body.name,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                categories: req.body.categories
            }).save((err) => {
                if(err){
                    return next(err);
                } 
                return res.send(req.body);
            });
        } else {
            return res.status(403).send("Already has that recipe");
        }
    });
  })

  const type = upload.single('recfile');
  app.post('/images', type, function (req, res) {
    const file = req.file;
    console.log("file size: " + file.size);
    console.log("file type: " + file.mimetype);
    console.log("file encoding: " + file.encoding);

    Image.findOne({}, (err, name) => {
        if (err) {
            return next(err);
        } else {
            new Image({
                    name: file.name,
                    buffer: file.buffer,
                    encoding: file.encoding,
                    mimetype: file.mimetype
                }).save((err) => {
                    if(err){
                        return next(err);
                    } 
                    return res.send(req.headers);
                })
            }
        });
    return res.status(200).send("Image upload ok");
    });
  
app.listen(port, () => console.log(`Server listening a port ${port}!`));
