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
var media = process.argv.splice(3).join('');
//This function is called when the user enters 'concert-this' into the command variable
function bandsInTownReq() {
    var artist = media;
    //Axios asynch request using .then to return information from the api
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        //Axios Response
        function(r) {
            for (let i = 0; i < 5; i++) {
                const shows = r.data[i];
                //Takes JSON property datetime, converts it to moment, then converts it to include day of the week, date in word view, and time of the show
                var dateTime = new Date(shows.datetime);
                dateTime = moment(dateTime).format('LLLL');
                console.log('Concert City:'+shows.venue.city +', '+shows.venue.region);
                console.log('Venue Name: '+shows.venue.name);
                console.log('Show Date & Time: '+ dateTime + '\n');
                console.log('--------------------------------\n');
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
//Function that takes media input from user, sets it to song and queries the spotify API
function spotifyReq() { 
    var song = media;
    axios.get('')

}

function omdbReq() {
    var movie = media;
    axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
        function(r){
            var info = r.data;
            console.log('The Title of the Movie is: '+ info.Title);
            console.log('The Release Year of the Movie is: ' + info.Year);
            console.log('The IMDB rating of the Movie is: ' + info.Ratings[0].Value);
            console.log('The Rotten Tomatoes rating of the Movie is: ' +  info.Ratings[1].Value);
            console.log('The Country where the Movie Was Produces is: ' +  info.Country);
            console.log('The Plot of the Movie is: ' +  info.Plot);
            console.log('Some Actors in the Movie Are: ' +  info.Actors);
            console.log('\n---------------------------------------------\n');
            
        },
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

//This function takes in information from OMDB for movie information, returns it as json
//This function determines what the user is interested in returning. I.E movie, song, or concert sought
function detectSelector() {
    switch(command) {
        case 'concert-this':
            bandsInTownReq();
            break;
        case 'spotify-this-song':
            break;
        case 'movie-this':
            omdbReq();
            break;
        case 'do-what-it says':
            break;
    }
}

detectSelector();