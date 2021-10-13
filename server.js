const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const app = express();
const os = require("os");
const path = require("path");
const port = 1234;

const mongoDB = "mongodb://localhost:27017/recipedb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongdoDB error!!!!!!!!!!!!!!!!"));


app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
let recipeJson = "";


app.get("/", (req, res) => {
    res.send("<h1>Hels</h1>");
});

app.get("/recipe/:food", (req, res, next) => {
    //console.log("xxx: "+ req.params.name);
    const iid = "6165340bceed45e103086bc1";
    console.log("etsi nimellä: " + req.params.food);

    Recipe.findOne({ name: req.params.food }, function (err, recipe){
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

app.post('/recipe/', function (req, res, next) { // next object helps error handling?
    // Checks if we have the recipe already
    Recipe.findOne({ name: req.body.name}, (err, name) => {
        if (err) return next(err);
        if(!name){
            new Recipe({
                name: req.body.name,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions
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

app.listen(port, () => console.log(`Server listening a port ${port}!`));
