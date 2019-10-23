// import the npm express package
var express = require("express");
// create a new express instance called app
var app = express();
// designate which port to use: the environment provided port or a default port 8080
var PORT = process.env.PORT || 8080;

// middleware functions that make it easier for the server to interpret data that is sent to it
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router map that tells the program which routes to follow when certain requests are submitted
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// event listener that listens for the PORT being used and console.log's it
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT)
})