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
    console.log(testUrl);
});

//app.use("/api/poems", require("./api/poems.js"));


app.listen(port, () => console.log(`Server listening a port ${port}!`));
