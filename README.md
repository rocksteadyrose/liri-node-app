# liri-node-app

LIRI is a Language Interpretation and Recognition Interface command line node app that takes in parameters and gives you back data.

* "liri my-tweets" retrieves my last 20 tweets from the Twitter API

* "liri spotify-this-song 'songname'" retrieves the following from the Spotify API:
    * The artist
    * Song name
    * Album
    * Song preview
-- If no songname is requested, Liri will retrieve 'The Sign' by Ace of Base

* "liri movie-this 'moviename'" retrieves the following from the OMDB API:
   * Title of the movie
   * Year the movie came out
   * IMDB Rating of the movie
   * Rotten Tomatoes Rating of the movie
   * Country where the movie was produced
   * Language of the movie
   * Plot of the movie
   * Actors in the movie
 -- If no movie name is requested, Liri will retrieve 'Mr. Nobody'
 
 * "liri do-what-it-says" uses the fs Node package to take the text inside of random.txt and run "spotify-this-song".
 
 * Liri also outputs and appends ach command response to a .txt file called log.txt.
