var friends = require("../data/friends")
// importing via require the friends array from the friends.js file
module.exports = function(app) {
  // exporting via module.exports a function that takes in the express instance called app.
  // a api get route that accesses the friends array and displays each user as a json object
  // the arguments that the api get route takes are the route and a function that takes in the request and the response objects of the api call.
  app.get("/api/friends", function(req, res) {
    // the response json object of the friends array
    res.json(friends);
  })

  // a api post route that 
  app.post("/api/friends", function(req, res) {

    var bestMatch = {
      name: '',
      photo: '',
      friendDifference: Infinity
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference;

    for(var i=0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    friends.push(userData);

    res.json(bestMatch)
  });
};