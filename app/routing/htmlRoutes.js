// import path
var path = require("path");

// create a function via the express instance that you can use across pages
module.exports = function (app) {
  // a get route along the /survey url query that takes in a function that
  app.get("/survey", function (req, res) {
    // displays the survey.html page via the folder path
    res.sendFile(path.join(__dirname, "../public/survey.html"))
  });
  // a get route along the default url query that takes in a function that
  app.get("/", function (reg, res) {
    // displays the home.html page upon load
    res.sendFile(path.join(__dirname, "../public/home.html"))
  })
}