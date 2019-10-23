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
    // a variable object called bestMatch that has empty key value pairs of name and photo, with a friend difference of infinity 
    var bestMatch = {
      name: '',
      photo: '',
      friendDifference: Infinity
    };
    // variable called userData that takes the body created from the middleware functions of the request.
    var userData = req.body;
    // variable called userScores that is set equal to the scores key in the object body of the friends array
    var userScores = userData.scores;
    // creating an empty variable called totalDifference
    var totalDifference;
    // a for loop that iterates through the friends array and
    for(var i=0; i < friends.length; i++) {
      // sets a variable currentFriend equal to the current iterated index of the friends array.
      var currentFriend = friends[i];
      // sets totalDifference equal to zero
      totalDifference = 0;
      // a nested for loop that iterates through the scores of the current friend and
      for (var j = 0; j < currentFriend.scores.length; j++) {
        // sets a variable called currentFriendScore equal to the current scores index in the array and
        var currentFriendScore = currentFriend.scores[j];
        // creates a variable called currentUserScore and sets it equal to the current userScore index
        var currentUserScore = userScores[j];
        // add and equl
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }
      // a conditional that compares if totalDifference is less than or equal to the friendDifference of the bestMatch, then
      if (totalDifference <= bestMatch.friendDifference) {
        // replace the bestMatch key values with the currentFriend key values for name and photo and set the bestMatch friendDifferenece to have a new value that is the totalDifference.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    // push the new userData into the friends array
    friends.push(userData);
    // respond with a json object of bestMatch
    res.json(bestMatch)
  });
};