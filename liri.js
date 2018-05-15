require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// Import the keys.js file for Twitter and Spotify Keys
var keys = require("./keys.js");

// Setup variables to request data using the plugins

var request = require('request');
var fs = require("fs");

var client = new Twitter(keys.Twitter);
var spotify = new Spotify(keys.Spotify);

console.log('-------------------------------------------');
console.log('Enter "node liri.js my-tweets" to show last 20 tweets.');
console.log('Enter "node liri.js spotify-this-song <song name>" for information about <song name>.');
console.log('Enter "node liri.js movie-this <movie name>" for information about <movie name>.');
console.log('Enter "node liri.js do-what-it-says" to take text inside of random.txt to call one of LIRIs commands.');
console.log('-------------------------------------------');

// Determine which data???
var getData = process.argv;
var parameter2 = process.argv[2];
var parameter3 = process.argv[3];


switch(parameter2) {
    case 'my-tweets':
        // console.log(getData);
        getTweets();
        break;
    case 'spotify-this-song':
        // console.log(getData);
        searchSpotify();
        break;
    case 'movie-this':
        // console.log(getData);
        getMovieInfo();
        break;
    case 'do-what-it-says':
        console.log(getData);
        random();
        break;
    default:
        console.log('Invalid Entry');
}


function getTweets() {

    // GET last 20 Twitter tweets
    var params = {screen_name: 'jteeter58'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        console.log('-------------------------------------------');

        if (!error) {
            
            tweets.reverse(); // ***************** NICE *****************

            for (var i = 0; i < tweets.length && i < 20; i++) {

                console.log((i+1) + ')  ' + tweets[i].text + '  [' + tweets[i].created_at + ']');
                console.log('-------------------------------------------');
            }
        }
    });
};


function searchSpotify() {

    var songName = '';
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < getData.length; i++) {

        if (i > 3 && i < getData.length) {

            songName = songName + "+" + getData[i];
            
        }
        else {
            songName += getData[i];
        }
    }   
    if (!songName) {
        songName = 'The+Sign';
    }
    
    console.log('songName = ' + songName);

    // BETTER WAY CAN REPLACE THE ABOVE FOR LOOP:
    // *** var songName = process.argv.slice(3).join("+"); ***
    // as shown in below function getMovieInfo().

    // SEARCH Spotify for songs
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log('-------------------------------------------');
        console.log('Artist(s):  ' + data.tracks.items[0].artists[0].name);
        console.log('-------------------------------------------');
        console.log('Song Name:  ' + data.tracks.items[0].name);
        console.log('-------------------------------------------');
        console.log('Song Preview Link:  ' + data.tracks.items[1].preview_url);
        console.log('-------------------------------------------');
        console.log('Album:  ' + data.tracks.items[0].album.name);        
        console.log('-------------------------------------------');   
    });
};


function getMovieInfo() {
    
    // Store all of the arguments in an array
    // Create an empty variable for holding the movie name
    
    var movieName = process.argv.slice(3).join("+");

    if (!movieName) {
        movieName = 'Mr+Nobody';
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log('query URL = ' + queryUrl);

    request(queryUrl, function(error, response, body) {

        // console.log(response);

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

            console.log('-------------------------------------------');
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("imdb Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log('-------------------------------------------');
        }
    });
};


function random() {
    // Read the random.txt file
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        
        // Break the string down by comma separation and store the contents into the output array.
        var outputArr = data.split(",");

        // Loop Through the newly created output array
        for (var i = 0; i < outputArr.length; i++) {
            // Print each element (item) of the array/
            console.log(outputArr[i]);
        }

        var action = outputArr[0];
        var songName = outputArr[1];

        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
    
            console.log('-------------------------------------------');
            console.log('Artist(s):  ' + data.tracks.items[0].artists[0].name);
            console.log('-------------------------------------------');
            console.log('Song Name:  ' + data.tracks.items[0].name);
            console.log('-------------------------------------------');
            console.log('Song Preview Link:  ' + data.tracks.items[0].preview_url);
            console.log('-------------------------------------------');
            console.log('Album:  ' + data.tracks.items[0].album.name);        
            console.log('-------------------------------------------');   
       
        });
    });
};