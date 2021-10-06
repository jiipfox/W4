const { response } = require("express");
const express = require("express");
const os = require("os");
const path = require("path");
const app = express();
const port = 1234;

app.use(express.json());
//app.use(express.urlencoded({extended: false}));



app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1> Hello and world world");
    let testUrl = req.url;

});

app.get("/recipe/:food", (req, res) => {
    let testUrl = req.url;
    let name = testUrl.substring(8);
    const dummyJson = '{"name": "'+name+'", "instructions":  "1. Boil water", "incredients": "100g matter"}';

    console.log(testUrl + "-> " + name);
    console.log(dummyJson);
    
    const recipeJson = JSON.parse(dummyJson);
    response.send(recipeJson);
});

//app.use("/api/poems", require("./api/poems.js"));


app.listen(port, () => console.log(`Server listening a port ${port}!`));
