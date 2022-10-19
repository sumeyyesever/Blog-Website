const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

const firstContent = "\"There are three things all wise men fear: the sea in storm, a night with no moon, and the anger of a gentle man.\""

app.get("/", function(req,res){
    res.render("home", {firstContent: firstContent});
});

app.listen(3000, function(){
    console.log("listening");
});


