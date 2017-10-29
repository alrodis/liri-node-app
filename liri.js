var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
//load Request (for OMDB)

var twitterKeysINeed = require("./keys.js");

var action = process.argv[2];

switch (action) {
    case "my-tweets":
        myTweets();
        break;
}

function myTweets() {
    var client = new Twitter(twitterKeysINeed);

    var params = { screen_name: '@NWCB_0815' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // var tweetResponse = JSON.stringify(tweets, null, 2)
            for (var i = 0; i < tweets.length; i++) {

                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            };
        } else {
            console.log(error);
        }
    });
}



 
var spotify = new Spotify({
  id:'5195314043b341fea99001c41b8533e8',
  secret:'467957e6ec6d451e963e4ba39c8846c4'
});
 
spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
    console.log("This is the artist: " + data.artists.name);
    console.log("This is the song name: " + data.name);
    console.log("Preview link of the song: " + data.external_urls);
    console.log("This is the album: " + data.album.name); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });


// var tweetResponse = [
// 	{},
// 	{}.
// 	{}
// ]

// {
// 	tweets: 'tweets'
// }