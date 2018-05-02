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
var inputs = process.argv;
var command = inputs[2];
var addtlCommands = "";

for (var i = 3; i < inputs.length; i++) {
    if (i > 3 && i < inputs.length) {
        addtlCommands = addtlCommands + "+" + inputs[i];
    } else {

        addtlCommands += inputs[i];

    }
}

if (command === "my-tweets") {
    myTweets()
}

if (command === "spotify-this-song") {
    spotifyThisSong(addtlCommands);
}

if (command === "movie-this") {
    movieThis(addtlCommands);
}

if (command === "do-what-it-says") {
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
    if (addtlCommands === "") {
        songName = "The Sign";
    }

    spotify.search({ type: 'track', query: songName, limit: 20 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("Song name: " + data.tracks.items[5].name);
        console.log("Artist(s): " + data.tracks.items[5].album.artists[0].name);
        console.log("Preview link: " + data.tracks.items[5].preview_url);
        console.log("Album: " + data.tracks.items[5].album.name);
    })
}

function movieThis(movieName) {

    if (addtlCommands === "") {
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\nIt's on Netflix!");
        movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        var movieResponse = JSON.parse(body);
        if (!error && response.statusCode === 200) {
        }

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release year: " + JSON.parse(body).Released);
        console.log("IMDB rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", { encoding: "utf8" }, function (error, data) {

        if (error) {
            return console.log(error)
        }

        addtlCommands = data.split(',');
        spotifyThisSong(addtlCommands[1]);
    });
}

