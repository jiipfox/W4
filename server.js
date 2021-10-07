const express = require("express");
const app = express();

const os = require("os");
const path = require("path");
const port = 1234;

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
    const dummyJson = '{"name": "Pizza", "instructions": ["1. Boil water", "2. Add matter"], "incredients": [ "100g matter", "1000g water"]}';

    console.log(dummyJson);

    recipeJson = JSON.parse(dummyJson);

    res.send(recipeJson);
});

app.post('/recipe/', function (req, res) {
    res.send('ENTER THE RECIPE');
    console.log("In post method");
  })

app.listen(port, () => console.log(`Server listening a port ${port}!`));
