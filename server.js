//const { response } = require("express");
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
    if (toString(recipeJson.name).length > 2) {
        res.render('index', { title: 'Recipe gt', 
                                name: recipeJson.name, 
                                ingredients: recipeJson.incredients, 
                                instructions: recipeJson.instructions});
    }
    else {    
        res.send("<h1>Hello food</h1> Please wisit /food/pizza for first for recipe");
        let testUrl = req.url;
    }
});

app.get("/recipe/:food", (req, res) => {
    let testUrl = req.url;
    let name = testUrl.substring(8);
    name = name.charAt(0).toUpperCase() + name.substring(1); // make first character uppercase
    const dummyJson = '{"name": "'+name+'", "instructions":  "1. Boil water", "incredients": "100g matter"}';

    console.log(testUrl + "-> " + name);
    console.log(dummyJson);

    recipeJson = JSON.parse(dummyJson);

    res.send(recipeJson);

});

//app.use("/api/poems", require("./api/poems.js"));


app.listen(port, () => console.log(`Server listening a port ${port}!`));
