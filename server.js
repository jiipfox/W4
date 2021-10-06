//const { response } = require("express");
const express = require("express");
const os = require("os");
const path = require("path");
const app = express();
const port = 1234;

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'pug');

//app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1> Hello and world world3");
    let testUrl = req.url;

});

app.get("/recipe/:food", (req, res) => {
    let testUrl = req.url;
    let name = testUrl.substring(8);
    const dummyJson = '{"name": "'+name+'", "instructions":  "1. Boil water", "incredients": "100g matter"}';

    console.log(testUrl + "-> " + name);
    console.log(dummyJson);

    const recipeJson = JSON.parse(dummyJson);

    res.send(recipeJson);

    res.render('index', { title: 'Recipe gt', 
                            name: recipeJson.name, 
                            incredients: recipeJson.incredients, 
                            instructions: recipeJson.instructions});
});

//app.use("/api/poems", require("./api/poems.js"));


app.listen(port, () => console.log(`Server listening a port ${port}!`));
