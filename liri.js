//loading the various npm packages needed for this project
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var twitterKeysINeed = require("./keys.js");

//code to grab the user-input title of either the "song" or "movie" from command line (index 3), which will be passed into search
var nodeArgs = process.argv;
var title = "";
for (var i = 2; i < nodeArgs.length; i++) {
    title = title + " " + nodeArgs[i];
};
console.log("-------------------------");
console.log("This is either the song or movie title the user had input: " + title);
console.log("-------------------------");

//Switch statement to invoke functions based upon a specific command given for index 2 on command line
var action = process.argv[2];

switch (action) {
    case "my-tweets":
        myTweets();
        break;

        // case "spotify-this-song"
        // 	spotifySearch();
        // 	break;
}

//Twitter
function myTweets() {
    var client = new Twitter(twitterKeysINeed);

    var params = { screen_name: '@NWCB_0815' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // var tweetResponse = JSON.stringify(tweets, null, 2)
            for (var i = 0; i < tweets.length; i++) {
                // console.log("-------------------------");
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log("-------------------------");
            };
        } else {
            console.log(error);
        }
    });
}

//Spotify
var spotify = new Spotify({
    id: '5195314043b341fea99001c41b8533e8',
    secret: '467957e6ec6d451e963e4ba39c8846c4'
});

//Spotify "Search" method:
spotify.search({ type: 'track', query: 'all the small things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    // **console.log(data);  //all data returned
    // **console.log(data.tracks.items[0]); //opening up data to get needed info
    console.log("-------------------------");
    console.log("Artist name: " + data.tracks.items[0].artists[0].name); //artist name
    console.log("Song name: " + data.tracks.items[0].name); //song name
    console.log("Preview link for this song: " + data.tracks.items[0].href); //preview link
    console.log("Album name: " + data.tracks.items[0].album.name); //album name
    console.log("-------------------------");
});



//Response/OMDB
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
        console.log("-------------------------");
        console.log(JSON.parse(body));
        console.log("-------------------------");
        console.log("movie title: " + JSON.parse(body).title);
        console.log("year released (dot): " + JSON.parse(body).released);
        console.log("year released (bracket): " + JSON.parse(body)['released']);
        console.log("The movie's imdbRating is: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes rating: " + JSON.parse(body).ratings);
        console.log("Country produced: " + JSON.parse(body).country);
        console.log("movie's language: " + JSON.parse(body).language);
        console.log("movie plot: " + JSON.parse(body).plot);
        console.log("movie actors: " + JSON.parse(body).actors);
        console.log("-------------------------");
        // console.log(response);
    }
});