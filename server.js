const express = require("express");
const os = require("os");
const path = require("path");
const app = express();
const port = 1234;
let recipeJson = "";

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'pug');

//app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    /*res.render('index', { title: 'Recipe gt', 
                                name: recipeJson.name, 
                                ingredients: recipeJson.incredients, 
                                instructions: recipeJson.instructions});*/
    res.send(recipeJson);
});

app.get("/recipe/:food", (req, res) => {
    let testUrl = req.url;
    let name = testUrl.substring(8);
    name = name.charAt(0).toUpperCase() + name.substring(1); // make first character uppercase
    const dummyJson = '{"name": "'+name+'", "instructions": ["1. Boil water", "2. Add matter"], "incredients": [ "100g matter", "1000g water"]}';

    console.log(testUrl + "-> " + name);
    console.log(dummyJson);

    recipeJson = JSON.parse(dummyJson);

    res.send(recipeJson);

});

app.post('/recipe/', function (req, res) {
    res.send('ENTER THE RECIPE');
    console.log("In post method");
  })

app.listen(port, () => console.log(`Server listening a port ${port}!`));
