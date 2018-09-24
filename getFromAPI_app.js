//initializing
var express = require("express");
var app = express();
var request = require("request");
const jsonfile = require("jsonfile")

//setting the view
app.set("view engine", "ejs");

//load json data
var moviesTitleData = require("./movies");
var moviesTitleArray = [];
moviesTitleData.forEach(function(movie){
    moviesTitleArray.push(movie.Title);  
});
var length = moviesTitleArray.length;

//getting the API data
var moviesData = [];
const moviesResponseFile = "./movies_res.json";
var count = 0;

app.get("/", function(req, res){
    for(var i = 0; i<length; ++i){
        //creating promise for each movie
        var promise = new Promise(function(resolve, reject){
            var url = "http://www.omdbapi.com/?t=" + moviesTitleArray[i] + "&apikey=thewdb";
            request(url, function(error, response, body){
                if(!error && response.statusCode == 200){
                    var data = JSON.parse(body);
                    resolve(data);
                }
            });
        });
        //add movie data to array
        promise.then(function(data){
            moviesData.push(data);
            jsonfile.writeFileSync(moviesResponseFile, data, { flag: 'a' }); 
        });
    }
});

//server config
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started!"); 
});