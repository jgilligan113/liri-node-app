//all packages required
var keys = require("./keys.js");
var inquirer = require("inquirer");
var spotify = require("spotify");
var twitter = require("twitter");
var request = require("request");
var data2

//variable declaration of keys and others besides packages
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessTokenKey = keys.twitterKeys.access_token_key;
var accessTokenSecret = keys.twitterKeys.access_token_secret;

//accessing twitter
var client = new twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret
});

if (process.argv[2] == "do-what-it-says") {
    var fs = require("fs");
    data2 = [];
    
    fs.readFile("random.txt", 'utf8', function(err, data) {
    data2 = data.split(",");
    console.log(data2[0]);
    song = data2[1];
    switch (data2[0]) {
    case 'my-tweets':
        getTweets(); 
    break;

    case 'spotify-this-song':
        getSpotify();
    break;

    case 'movie-this':
       getMovie();
    break;
    }
    })
} else {


var input = {
    type: "input",
    name: "command",
    message: "what would you like to do?"
};

inquirer.prompt([
    input
]).then(function(input) {
    console.log(input.command);
//twitter request 
    switch (input.command) {
    case 'my-tweets':
        getTweets(); 
    break;

    case 'spotify-this-song':
        getSpotify();
    break;

    case 'movie-this':
       getMovie();
    break;

    case 'do-what-it-says':
        if (data[0] == 'spotify-this-song')
        {   song = data[1];
            getSpotify();
        } else {console.log("I'm tired!")}
    break;
}
})

function getTweets() {
    var params = {screen_name: 'Jessie_Gilligan'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
         //console.log(response);
         for (var i = 0; i < 20; i++) {
         console.log("------Tweet: "+ i +"------");
         console.log(JSON.stringify(tweets[i].created_at, null, 2));
         console.log(JSON.stringify(tweets[i].text, null, 2));
         console.log("-----------------");
         }
        }
    })
};
}

    
function getSpotify() {
    console.log('search a song');
    console.log(data2);
    if (data2 = "underfinde") {
    var input2 = {
    type: "input",
    name: "song",
    message: "what song shall I look up?"
};

inquirer.prompt([
    input2
]).then(function(input2) {
    console.log(input2);
    console.log(input2.song);
    if (input2.song == "") {
        //if song is null conduct search with the sign values
        spotify.search({ type: 'track', query: "The Sign (US Album) [Remastered]", artist: "ace of base"}, function(err, data) {
            if ( err ) {
            console.log('Error occurred: ' + err);
            return;
                } else { 
                console.log("I saw the sign");
                console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
                console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name,null,2));
                console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].preview_url,null,2));
                console.log("Artist(s)");
                console.log("-----------");
                for (var i2 = 0; i2 < data.tracks.items[0].artists.length; i2++) {
                    console.log(JSON.stringify(data.tracks.items[0].artists[i2].name))
                    }
                }
            }
        )} else {
        song = input2.song;}

        spotify.search({ type: 'track', query: song}, function(err, data) {
        if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else {
    //console.log('Artist(s): '+data.)
        console.log("------TOP 3 RESULTS------");
        for (var i = 0; i < 3; i++) {
            console.log("Album Name: " + JSON.stringify(data.tracks.items[i].album.name, null, 2));
            console.log("Song Name: " + JSON.stringify(data.tracks.items[i].name,null,2));
            console.log("Spotify Link: " + JSON.stringify(data.tracks.items[i].preview_url,null,2));
            console.log("Artist(s)");
            console.log("-----------");
                for (var i2 = 0; i2 < data.tracks.items[i].artists.length; i2++) {
                    console.log(JSON.stringify(data.tracks.items[i].artists[i2].name))
                    }
            }   
        }
    })
    })
    }
}


//function to get movie data from OMDB api
 function getMovie() {
     //check input to ensure move lookup
     console.log('look up a movie');
     
     //inquire what movie to lookup
     var input3 = {
        type: "input",
        name: "movieName",
        message: "what movie would you like to review?"
    };
    //upon reply, take input and add to api call query url
     inquirer.prompt([
        input3
    ]).then(function(input3) {
        console.log(input3.movieName);
        if (input3.movieName) {
            movie = input.movieName;
            var queryUrl = "http://www.omdbapi.com/?t=" + input3.movieName + "&y=&plot=short&r=json";} 
            else {
                var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&r=json";
            }
    // log out the actual URL.
    console.log(queryUrl);
    // make api request
    request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

  //parse out and log required api elements
    console.log("Movie title: " + JSON.parse(body).Title);
    console.log("Release year: " + JSON.parse(body).Year);
    console.log("IMDB rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    //console.log("Rotten Tomatoes: " + JSON.parse(body).Rotten);
    }
});   

})
}

