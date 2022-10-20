const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


const aboutContent = "Hi I'm Sümeyye. I'm a computer engineering student in Turkey";
let bookTitle = "";
let quote = "";


app.get("/", function(req,res){
    res.render("home", {bookTitle: bookTitle, quote: quote});
});

app.get("/about", function(req,res){
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req,res){
    res.render("contact")
});

app.get("/compose", function(req,res){
    res.render("compose");
});

app.post("/compose", function(req,res){

    bookTitle = req.body.bookTitle;
    quote = "\"" + req.body.quote + "\"";

    res.redirect("/");

});



app.listen(3000, function(){
    console.log("listening");
});


