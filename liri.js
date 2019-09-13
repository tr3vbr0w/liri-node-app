var axios = require("axios");
// require("dotenv").config();

// var keys = require("./keys.js");


// var spotify = new Spotify(keys.spotify);
//Make liri.js so that it can take in one of the following commands
// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
//Set two variables to take the user input from the command line. After the address and npm package, process.argv[2] represents the case in the switch statement, process.argv[3] represents the band, song or movie the user requests information about

var command = process.argv[2];
var media = process.argv[3];
//This function is called when the user enters 'concert-this' into the command variable
function bandsInTownReq() {
    var artist = media;
    //Axios asynch request using .then to return information from the api
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(r) {
            console.log(r.data[1].venue)
        }
    )};
//Variable that takes in the information from 
function spotifyReq() { 
    var song = media;
    axios.get('')

}
//This function determines what the user is interested in returning. I.E movie, song, or concert sought
function detectSelector() {
    switch(command) {
        case 'concert-this':
            bandsInTownReq();
            break;
        case 'spotify-this-song':

    }
}

detectSelector();