var axios = require("axios");

var moment=require('moment');
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
        //Axios Response
        function(r) {
            for (let i = 0; i < 5; i++) {
                const shows = r.data[i];
                console.log('Concert City:'+shows.venue.city +', '+shows.venue.region);
                console.log('Venue Name: '+shows.venue.name);
                var dateTime = new Date(shows.datetime);
                dateTime = moment(dateTime).format('LLLL');
                console.log('Show Date & Time: '+ dateTime+ '\n');
                
                console.log('--------------------------------');
            }
        },
        //Error Response
        function(error){
            //Request is made and the server responds with a status code
            if (error.r) {
                console.log(error.r.data)
                console.log(error.r.status)
                console.log(error.r.header)
            //Request is made but no response is recieved
            }else if (error.request){
                console.log(error.request);
            //Something happened setting up the request that triggered the error
            }else {
                console.log('Error :' + error.message)
            }
            console.log(error.config)
        }

    )};
//Variable that takes in the information from 
function spotifyReq() { 
    var song = media;
    axios.get('')

}

//This function takes in information from OMDB for movie information, returns it as json
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