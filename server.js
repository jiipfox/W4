const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const app = express();

const os = require("os");
const path = require("path");
const port = 1234;

const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongdoDB error!!!!!!!!!!!!!!!!"));


app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
let recipeJson = "";


app.get("/", (req, res) => {
    //res.render('index', { title: 'Recipe gt', 
    //                            name: recipeJson.name, 
    //                            ingredients: recipeJson.incredients, 
    //                            instructions: recipeJson.instructions});
    res.send("<h1>Hels</h1>");
});

app.get("/recipe/:food", (req, res) => {
    let testUrl = req.url;
    let name = testUrl.substring(8);
    name = name.charAt(0).toUpperCase() + name.substring(1); // make first character uppercase
    const dummyJson = '{"name": "'+name+'", "instructions": ["1. Boil water", "2. Add matter"], "ingredients": [ "100g matter", "1000g water"]}';

    console.log(dummyJson);

    recipeJson = JSON.parse(dummyJson);

    res.send(recipeJson);
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
            console.log("Found something, saving something");
            console.log(req.body)
        } else {
            return res.status(403).send("Already has that recipe");
        }
    });

    //res.send(req.body);
    //console.log(req.body);
  })

app.listen(port, () => console.log(`Server listening a port ${port}!`));
