require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
//Make liri.js so that it can take in one of the following commands
// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`