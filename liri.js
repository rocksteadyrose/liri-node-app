//NPM INIT creates packaged json
//NPM INSTALL
require('dotenv').config();

var keys = require("./keys.js");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var fs = require('fs');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv;
var command = input[2];
var addtlCommands = input[3];

if (command === "my-tweets") {
    myTweets()
}

else if (command === "spotify-this-song") {
    spotifyThisSong(addtlCommands);
}

else if (command === "movie-this") {
    movieThis(addtlCommands);
}

else if (command === "do-what-it-says") {
    doWhatItSays();
}

function myTweets() {
    var params = { screen_name: 'lolthisacct', limit: 1 };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {

            var myTweets = tweets;

            for (i = 0; i < tweets.length; i++)
                console.log(myTweets[i].text);
        }
    });
}

function spotifyThisSong(songName) {
    if (addtlCommands === undefined) {
        songName = "The Sign";
    }
    spotify.search({ type: 'track', query: songName, limit: 20 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks.items[5].name);
        console.log(data.tracks.items[5].album.artists[0].name);
        console.log(data.tracks.items[5].preview_url);
        console.log(data.tracks.items[5].album.name);
    })
}

function movieThis(movieName) {

    if (addtlCommands === undefined) {
        addtlCommands = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        var movieResponse = JSON.parse(body);
        console.log(movieResponse);
        if (!error && response.statusCode === 200) {
        }

        // * Title of the movie.
        console.log("The movie's title is " + JSON.parse(body).Title);
        // * Year the movie came out.
        console.log("The movie's release year is " + JSON.parse(body).Released);
        // * IMDB Rating of the movie.
        console.log("The movie's IMDB rating is " + JSON.parse(body).imdbRating);
        // * Rotten Tomatoes Rating of the movie.
        console.log("The movie's Rotten Tomatoes Rating is " + JSON.parse(body).Ratings[1].Value);
        // * Country where the movie was produced.
        console.log("The movie's country is " + JSON.parse(body).Country);
        // * Language of the movie.
        console.log("The movie's language is " + JSON.parse(body).Language);
        // * Plot of the movie.
        console.log("The movie's plot is " + JSON.parse(body).Plot);
        // * Actors in the movie.
        console.log("The movie's actors are " + JSON.parse(body).Actors);
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", { encoding: "utf8" }, function (error, data) {

        if (error) {
            return console.log(error)
        }

        var newSong = data.replace(/[\,\r]/gm, " ").replace(/"/g,'');
        addtlCommands = newSong.slice(18, 37);
        spotifyThisSong(addtlCommands);
    });
}

