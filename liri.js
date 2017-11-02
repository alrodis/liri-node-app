//loading the various npm packages needed for this project
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var twitterKeysINeed = require("./keys.js");

//*********************************
//I didn't end up using the code below, but wanted to keep it for reference...
//*********************************
//code to grab the user-input title of either the "song" or "movie" from command line (index 3), which will be passed into search
// var nodeArgs = process.argv;
// var title = "";
// for (var i = 3; i < nodeArgs.length; i++) {
//     title = title + " " + nodeArgs[i];
// };
// console log test to ensure the "title" was grabbed successfully
// console.log("-------------------------");
// console.log("This is either the song or movie title the user had input: " + title);
// console.log("-------------------------");
//*********************************

//Switch statement to invoke functions, taking user input from command line, index 2 & 3: 
var action = process.argv[2];
var title = process.argv[3];

function liriCommand(action) {
    switch (action) {
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifySearch();
            break;

        case "movie-this":
            movieSearch();
            break;

        case "do-what-it-says":
            textSearch();
            break;

        default:
            console.log("Sorry not a recognized command.  Please enter a correct command.");

    }

}

//Twitter
function myTweets() {
    var client = new Twitter(twitterKeysINeed);

    var params = { screen_name: '@NWCB_0815' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // var tweetResponse = JSON.stringify(tweets, null, 2)
            for (var i = 0; i < tweets.length; i++) {
                console.log("-------------------------");
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
function spotifySearch() {
    var spotify = new Spotify({
        id: '5195314043b341fea99001c41b8533e8',
        secret: '467957e6ec6d451e963e4ba39c8846c4'
    });
    //if no song title is given in command line, search for "The Sign"
    if (!title) {
        title = "The Sign";
    }
    //Spotify "Search" method:
    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // **console.log(data);  //all data returned
        // **console.log(data.tracks.items[0]); //this opened up the object for me to pull out the needed info
        console.log("-------------------------");
        console.log("Artist name: " + data.tracks.items[0].artists[0].name); //artist name
        console.log("Song name: " + data.tracks.items[0].name); //song name
        console.log("Preview link for this song: " + data.tracks.items[0].href); //preview link
        console.log("Album name: " + data.tracks.items[0].album.name); //album name
        console.log("-------------------------");
    });

}

//Response/OMDB
function movieSearch() {
    //if no song movie is given in command line, search for "Mr Nobody"
    if (!title) {
        title = "Mr Nobody";
    }
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log("-------------------------");
            // console.log(JSON.parse(body)); //this allowed me to open up the object to pull out the needed info
            console.log("-------------------------");
            console.log("Movie title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Released);
            console.log("This Movie's imdbRating is: " + JSON.parse(body).imdbRating);
            console.log("This Movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Source.Value); //still need to sort this one out
            console.log("Country where produced: " + JSON.parse(body).Country);
            console.log("The Movie's language is: " + JSON.parse(body).Language);
            console.log("The Movie's plot is: " + JSON.parse(body).Plot);
            console.log("Actors in this move are: " + JSON.parse(body).Actors);
            console.log("-------------------------");
        }
    });

}

//readFile to read contents of random.txt file and then pass the contents of that file into the searchSpotify function
function textSearch() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log("-------------------------");
        // console.log("Contents of random.txt file: " + data)
        // console.log("-------------------------");
        var dataArr = data.split(",");
        action = dataArr[0];
        title = dataArr[1];
        liriCommand(action);
        return;
    });
}

liriCommand(action, title);