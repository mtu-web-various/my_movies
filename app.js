//initializing
var express = require("express");
var app = express();
const jsonfile = require("jsonfile")

//setting the view
app.set("view engine", "ejs");

//load json data
const moviesData = require("./movies_res");



//route for the main page
app.get("/", function(req, res){
    res.render("home", {moviesData:moviesData});
})
    
    
//server config
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started!"); 
});