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

addtlCommands = process.argv.slice(3).join('+');

if (command === undefined) {
    console.log("==========================================" + "\r\n" + "\r\n" + "Please enter a Liri command: my-tweets, spotify-this-song, movie-this, or do-what-it-says." + "\r\n" + "\r\n" + "==========================================")
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
    var params = { screen_name: 'lolthisacct', limit: 20 };
    var myTweets2 = [];

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {

            for (i = 0; i < tweets.length; i++) {
                var myTweets = "==========================================" + "\r\n" + "\r\n" + "Screen name: " + tweets[i].user.screen_name + "\r\n" + "\r\n" + "Tweet: " + tweets[i].text + "\r\n" + "\r\n" + "Tweet Posted On: " + tweets[i].created_at + "\r\n" + "\r\n" + "==========================================";
                console.log(myTweets);
                myTweets2.push(myTweets);
            }
        }
        var tweetsString = myTweets2.join('');
        logFile(tweetsString);

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

        var songTitle = "=====================================" + "\r\n" + "\r\n" + "Song name: " + data.tracks.items[5].name + "\r\n" + "\r\n" + "=====================================";

        var artist = "=====================================" + "\r\n" + "\r\n" + "Artist(s): " + data.tracks.items[5].album.artists[0].name + "\r\n" + "\r\n" + "=====================================";

        var songPreview = "=====================================" + "\r\n" + "\r\n" + "Preview link: " + data.tracks.items[5].preview_url + "\r\n" + "\r\n" + "=====================================";
        var albumName = "=====================================" + "\r\n" + "\r\n" + "Album: " + data.tracks.items[5].album.name + "\r\n" + "\r\n" + "=====================================";

        var spotifyInfo = songTitle + artist + songPreview + albumName;

        console.log(spotifyInfo);

        logFile(spotifyInfo);
    })

}

function movieThis(movieName) {

    if (addtlCommands === "") {
        console.log("=====================================" + "\r\n" + "\r\n + If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\nIt's on Netflix!" + "\r\n" + "\r\n" + "=====================================");
        movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        var movieResponse = JSON.parse(body);
        if (!error && response.statusCode === 200) {
        }

        //If it has a Rotten Tomatoes score
        if (JSON.parse(body).Ratings[1] && JSON.parse(body).Ratings[1].Value) {

            var body = JSON.parse(body);

            var movieTitle = "=====================================" + "\r\n" + "\r\n" + "Title: " + body.Title + "\r\n" + "\r\n" + "=====================================";
            var release = "=====================================" + "\r\n" + "\r\n" + "Release year: " + body.Year + "\r\n" + "\r\n" + "=====================================";
            var IMDBrating = "=====================================" + "\r\n" + "\r\n" + "IMDB rating: " + body.imdbRating + "\r\n" + "\r\n" + "=====================================";
            var rottenTomatoes = "=====================================" + "\r\n" + "\r\n" + "Rotten Tomatoes Rating: " + body.Ratings[1].Value + "\r\n" + "\r\n" + "=====================================";
            var country = "=====================================" + "\r\n" + "\r\n" + "Country: " + body.Country + "\r\n" + "\r\n" + "=====================================";
            var language = "=====================================" + "\r\n" + "\r\n" + "Language: " + body.Language + "\r\n" + "\r\n" + "=====================================";
            var plot = "=====================================" + "\r\n" + "\r\n" + "Plot: " + body.Plot + "\r\n" + "\r\n" + "=====================================";
            var actors = "=====================================" + "\r\n" + "\r\n" + "Actors: " + body.Actors + "\r\n" + "\r\n" + "=====================================";
            var movieInfo = movieTitle + release + IMDBrating + rottenTomatoes + country + language + plot + actors;

            console.log(movieInfo);

            logFile(movieInfo);
        }

        //If it doesn't have a Rotten Tomatoes score

        else {

            var body = JSON.parse(body);

            var movieTitle = "=====================================" + "\r\n" + "\r\n" + "Title: " + body.Title + "\r\n" + "\r\n" + "=====================================";
            var release = "=====================================" + "\r\n" + "\r\n" + "Release year: " + body.Year + "\r\n" + "\r\n" + "=====================================";
            var IMDBrating = "=====================================" + "\r\n" + "\r\n" + "IMDB rating: " + body.imdbRating + "\r\n" + "\r\n" + "=====================================" + "\r\n" + "\r\n" + "Rotten Tomatoes Rating: Not listed" + "\r\n" + "\r\n" + "=====================================";
            var country = "=====================================" + "\r\n" + "\r\n" + "Country: " + body.Country + "\r\n" + "\r\n" + "=====================================";
            var language = "=====================================" + "\r\n" + "\r\n" + "Language: " + body.Language + "\r\n" + "\r\n" + "=====================================";
            var plot = "=====================================" + "\r\n" + "\r\n" + "Plot: " + body.Plot + "\r\n" + "\r\n" + "=====================================";
            var actors = "=====================================" + "\r\n" + "\r\n" + "Actors: " + body.Actors + "\r\n" + "\r\n" + "=====================================";

            var movieInfo = movieTitle + release + IMDBrating + country + language + plot + actors;

            console.log(movieInfo);

            logFile(movieInfo);
        }

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

function logFile(printLiri) {

    fs.appendFile("log.txt", printLiri, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("log.txt was updated with your Liri command!");

    });
}
