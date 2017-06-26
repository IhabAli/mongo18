// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Instantiate our Express App
var app = express();


// Connnect Handlebars to our Express App
app.engine("Handlebars", expressHandlebars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in our App
app.use(bodyParser.urlencoded({
	extended: false
}));

// Set up an Express Router
var router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));


// Have every request go through our router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URL || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
	// log any errors connecting with mongoose
	if (error) {
		console.log(error);
	}
	// Or log a success message
	else {
		console.log("mongoose connection is successful");
	}
});

// Listen on the port
app.listen(PORT, function() {
	console.log("Listening on port:" + PORT);
});