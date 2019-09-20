
//FileSystem Package
var fs = require("fs");
//Axios NPM Package
var axios = require("axios");

//Moment JS Package
var moment = require("moment");

//How to read .env file
require("dotenv").config();

//Require my seperate JS file, Keys.js
var keys = require("./keys.js");

//Information to require information from spotify information and create new spotify key
//Showing Error, cannot find module 'node spotify api'
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);




//First input into node is the command
var command = process.argv[2];

//Second input into node is media, joined on spaces
var media = process.argv.slice(3).join(' ');

//This function is called when the user enters 'concert-this' into the command variable
function bandsInTownReq() {
    //If statement reads concert this and combines the process.argv into a string with no spaces, required by bandsintown
    if (command === 'concert-this'){
        var artist = "";
        for (let i = 3; i < process.argv.length; i++) {
            artist += process.argv[i];
        }
    }
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
            if (error) {
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
    var searchSong;
    //Defaut searchSong to ace of base
    if (media === null){
        searchSong = 'The Sign';
    }else{
        searchSong = media;   
    }

    //Spotify required parameters as an object
    var spotParam = {
        type : "track",
        query : media,
    }
    spotify.search(spotParam, function(error, data){
        var songReturn = data.tracks.items[0]
        console.log('\n---------------\n');
        if (error){
            console.log('Error: ' + error)
            // break;
        }
        console.log('Song: '+ searchSong);
        console.log('Artist: '+songReturn.artists[0].name);
        console.log('Album: '+songReturn.album.name);
        console.log('Preview URL: '+songReturn.preview_url + '\n');
       
    });
}



function omdbReq() {
    var movie = media;
    if (movie === null){
        movie = 'Mr. Nobody';
        return movie;
    }
    //API Call to omdb
    axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
        
    //Function takes 
        function(r){
            var info = r.data;
            console.log('\nThe Title of the Movie is: '+ info.Title);
            console.log('The Release Year of the Movie is: ' + info.Year);
            console.log('The IMDB rating of the Movie is: ' + info.Ratings[0].Value);
            console.log('The Rotten Tomatoes rating of the Movie is: ' +  info.Ratings[1].Value);
            console.log('The Country where the Movie Was Produces is: ' +  info.Country);
            console.log('The Plot of the Movie is: ' +  info.Plot);
            console.log('Some Actors in the Movie Are: ' +  info.Actors);
            console.log('\n---------------------------------------------\n');
            
        },
        function(error){
            console.log("error")
            //Request is made and the server responds with a status code
            console.log(error.config)
        }
    )};

//Function for doWhatItSays that reads the first argument in random.txt as the command, the second argument in the command as the media, and outputs a given function based on the command and media as parameters
function doWhatItSays() {
    fs.readFile("random.txt","utf8", (error, data) => {
        //Once Confirmed that I can read the file successfully, split information from random.txt into two different variable and pass through the switch statement for the remaining three cases
        var random = data.split(",");
        command = random[0];
        media = random[1];
        console.log('Command: '+command);
        console.log("Media:"+media);
        
        switch(command) {
            case 'concert-this':
                bandsInTownReq();
                break;
            case 'spotify-this-song':
                spotifyReq();
                break;
            case 'movie-this':
                omdbReq();
                break;
            default:
                console.log("Invalid command entered");
        };
    });
}

//This function determines what the user is interested in returning. I.E movie, song, or concert sought
function detectSelector() {
    switch(command) {
        case 'concert-this':
            bandsInTownReq();
            break;
        case 'spotify-this-song':
            spotifyReq();
            break;
        case 'movie-this':
            omdbReq();
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Invalid command entered");
    }
}

detectSelector();