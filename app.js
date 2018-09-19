//initialize express
var express = require("express");
var app = express();

//server config
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started!"); 
});