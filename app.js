const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");



const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB");

const booksSchema = {
    title: String,
    quote: String
};

const Book = mongoose.model("Book", booksSchema);


const aboutContent = "Hi I'm Sümeyye. I'm a computer engineering student in Turkey";
let bookTitle = "";
let quote = "";


app.get("/", function(req,res){
    Book.find({}, function(err, foundBooks){
        if(!err){
            res.render("home", {books: foundBooks});
        }
        else{
            console.log(err);
        }
    });
    
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
    quote = req.body.quote ;

    const book = new Book({
        title: bookTitle,
        quote: quote
    });

    book.save();

    res.redirect("/");

});



app.get("/books/:bookID", function(req,res){
    const bId = req.params.bookID;
    Book.findById({_id: bId}, function(err, foundBook){
        if(!err){
            res.render("book", {title: foundBook.title, quote: foundBook.quote});
        }
        else{
            console.log(err);
        }
    });
});


app.listen(3000, function(){
    console.log("listening");
});


