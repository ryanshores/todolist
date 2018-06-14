var express = require("express");
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos");

app.use( morgan("dev") );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
	res.status(200).send("Hello from root");
});

app.use("/api/todos", todoRoutes);

app.get("*", function(req, res){
	res.status(404).send("Not found!");
});


app.listen(port, function(){
	console.log("Server is running on " + port);
});