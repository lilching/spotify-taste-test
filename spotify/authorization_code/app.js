/**
* This is an example of a basic node.js script that performs
* the Authorization Code oAuth2 flow to authenticate against
* the Spotify Accounts.
*
* For more information, read
* https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
*/
//from Github at https://github.com/nodejs/node/issues/33741
import { verify } from 'crypto';
import { createRequire } from 'module';
import { normalize } from 'path';
const require = createRequire(import.meta.url);

var express = require('express');
// var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var passwordHash = require('password-hash');
var http = require("http");
var app = express();


// const app = express();
//from @https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var {MongoClient} = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://mod7root:mod7pass@mod7cluster.ygyyw.mongodb.net/mod7database?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });

var username = ""

function findGenre(genre) {
  let out = genreDict[genre.replace(" ", "").replace("-","").replace("&", "").replace("+", "")]
  return out;
}
var genreDict = {
  pop: 'pop',
  dancepop: 'pop',
  postteenpop: 'pop',
  electropop: 'pop',
  popdance: 'pop',
  viralpop: 'pop',
  indiecafepop: 'pop',
  indiepop: 'pop',
  ukpop: 'pop',
  latin: 'pop',
  latinpop: 'pop',
  kpop: 'pop',
  regionalmexican: 'pop',
  canadianpop: 'pop',
  newwavepop: 'pop',
  europop: 'pop',

  poprap: 'hiphop',
  rap: 'hiphop',
  hiphop: 'hiphop',
  gangsterrap: 'hiphop',
  southernhiphop: 'hiphop',
  hardcorehiphop: 'hiphop',
  eastcoasthiphop: 'hiphop',
  trap: 'hiphop',
  traplatino: 'hiphop',
  dirtysouthrap: 'hiphop',
  melodicrap: 'hiphop',
  undergroundhiphop: 'hiphop',
  atlhiphop: 'hiphop',
  emorap: 'hiphop',
  chicagorap: 'hiphop',
  
  rock: 'rock',
  albumrock: 'rock',
  permanentwave: 'rock',
  classicrock: 'rock',
  hardrock: 'rock',
  modernrock: 'rock',
  heartlandrock: 'rock',
  mellowgold: 'rock',
  alternativerock: 'rock',
  softrock: 'rock',
  poprock: 'rock',
  artrock: 'rock',
  alternativemetal: 'rock',
  neometal: 'rock',
  folkrock: 'rock',
  danceerock: 'rock',

  edm: 'electronic',
  electrohouse: 'electronic',
  bigroom: 'electronic',
  popedm: 'electronic',
  tropicalhouse: 'electronic',
  progressiveelectrohouse: 'electronic',
  electronictrap: 'electronic',
  deepbigroom: 'electronic',
  brostep: 'electronic',
  progressivehouse: 'electronic',
  house: 'electronic',
  electropop: 'electronic',

  country: 'country',
  countryroad: 'country',
  contemporarycountry: 'country',
  moderncountryrock: 'country',
  countryrock: 'country',
  countrypop: 'country',
  outlawcountry: 'country',
  yachtrock: 'country',
  motown: 'country',

  classical: 'classical',
  compositionalambient: 'classical',
  backgroundmusic: 'classical',
  soundtrack: 'classical',
  hollywood: 'classical',
  scorecore: 'classical',
  calminginstrumental: 'classical',
  videogamemusic: 'classical',

  vocaljazz: 'jazz',
  lounge: 'jazz',
  adultstandards: 'jazz',
  jazzpop: 'jazz',
  easylistening: 'jazz',
  bolero: 'jazz',
  showtunes: 'jazz',
  chanson: 'jazz',
  folk: 'jazz',
  singersongwriter: 'jazz',


  rb: 'randb',
  urbancontemporary: 'randb',
  newjackswing: 'randb',
  neosoul: 'randb',
  hippop: 'randb',
  poprb: 'randb',
  quietstorm: 'randb',
  funk: 'randb',
  girlgroup: 'randb',
  alternativerb: 'randb',
  soul: 'randb',
  britishsoul: 'randb',
  reggaeton: 'randb',
  tropical: 'randb'

}

//var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const port = 8888;

var client_id = '179d99dacbac467497c807bbabe53630'; // Your client id
var client_secret = '02f0f9b272074c48b65b523dd5d8d0bc'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri


async function init() {
  
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    // await client.close();
  }
}
/**
* Generates a random string containing numbers and letters
* @param  {number} length The length of the string
* @return {string} The generated string
*/
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.use(express.static(path.join(process.cwd() + '/public')))
.use(cors())
.use(cookieParser());
// app.use(express.static(path.join(process.cwd() + '/public')))


app.get('/login', function(req, res) {
  
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  
  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));
});

app.get('/callback', function(req, res) {
  
  // your application requests refresh and access tokens
  // after checking the state parameter
  
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  
  if (state === null || state !== storedState) {
    res.redirect('/#' +
    querystring.stringify({
      error: 'state_mismatch'
    }));
  } 
  else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        
        var access_token = body.access_token,
        refresh_token = body.refresh_token;
        
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        request.get(options, function(error, response, body) {
          if(body.images[0].url){
            insertProfilePictureLink(body.images[0].url)
          }
        });
        
        var options_artists = {
          url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50&offset=0', 
          headers: {'Authorization': 'Bearer ' + access_token,  },
          json: true
        } 
   
        request.get(options_artists, function(error, response, body) {
          var artistsDict = {
            "pop": 0,
            "rock": 0,
            "hiphop": 0,
            "electronic": 0,
            "country": 0,
            "classical": 0,
            "jazz": 0,
            "randb": 0
          }
          for(let i = 0; i < 50; i++) {
            for(let j = 0; j < body.items[i].genres.length; j++){
              let genre = findGenre(body.items[i].genres[j])
              if(genre) {
                artistsDict[genre]++;
                
              }
            }

          }
          //console.log(artistsDict)
          if(logArtists(artistsDict)) {
            console.log("logged top artists genres for user " + username)
          }
          else {
            console.log("error when logging top artists genres for user " + username)
          }

        })
        
        // we can also pass the token to the browser to make requests from there
        // res.redirect('/#' +
        // querystring.stringify({
        //   access_token: access_token,
        //   refresh_token: refresh_token
        // }));
        res.redirect("/home.html")
      } 
      else {
        res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


app.get('/', (request, response)=> {
  response.sendFile(path.join(process.cwd() + '/public/login.html'));
  
});
app.listen(port, ()=>{
  console.log("listening on port " + port )
})

async function registerUser(userData){
  var res2 = await client.db("mod7database").collection("users").findOne({username: userData.username})
  // console.log("checking if username exists:")
  // console.log(res2)
  if(res2) {
    console.log("A user already exists with that username")
    return false;
  }
  else {
    var hashedPassword = passwordHash.generate(userData.password);
    var userDataHashed = {username: userData.username, hashedPassword: hashedPassword}
    await client.db("mod7database").collection("users").insertOne(userDataHashed)
    const res2 = await client.db("mod7database").collection("users").findOne({username: userData.username})
    console.log("sucessfully inserted: ")
    console.log(res2)
    return true;
  }
}
async function loginUser(userData){
  const res2 = await client.db("mod7database").collection("users").findOne({username: userData.username})
  if(res2) {
    if(res2.username == userData.username) {
      if(passwordHash.verify(userData.password, res2.hashedPassword)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }    
  }
  else {
    return false;
  }
  
}
app.post("/register-user", (req, res)=> {
  let userData = {username: req.body.username, password: req.body.password}
  registerUser(userData).then((value)=> {
    if(value) {
      username = req.body.username
      console.log("Registered user " + username)
      res.json({success: true, message: "Sucessefully registered user", link: "http://localhost:8888/spotifyLogin.html"})
    }
    else {
      console.log("User attempted to register with a username that already existed")
      res.json({success: false, message: "A user with that username already exists"})
    }
  }) 
})
app.post("/login-user", (req, res)=> {
  let userData = {username: req.body.username, password: req.body.password}
  loginUser(userData).then((value)=> {
    if(value) {
      username = req.body.username
      console.log("Logged in user " + username)
      res.json({success: true, message: "Sucessefully logged in", link: "http://localhost:8888/spotifyLogin.html"})
    }
    else {
      console.log("failed login attempt, username/password mismatch")
      res.json({sucess: false, message: "Username/password mismatch"})
    }
  }) 
})
app.get("/get-username", (req, res)=> {
  if(username) {
    res.json({success: true, username: username})
  }
  else {
    res.json({success: false, link: "http://localhost:8888/login.html"})
  }
})
app.post("/log-survey", (req, res)=> {
  // console.log(req.body)
  logSurvey(req.body).then((value)=> {
    if(value) {
      
      res.json({success: true, message: "Successfully inserted survey data", link: "http://localhost:8888/"})
    }
    else {
      res.json({success: false, message: "Failed to insert survey data"})
    }
  })
  calculateGenreScores().then((result)=>{
    if(result) {
      matchUser();
    }  
  })
})

//data of conversations, each with a unique id, 
  //list of messages, with content, user that sent it, timestamp
//ever user has a list of id's their attached to

async function logSurvey(data) {
  normalizeDict(data.scoresDict)
  const updateResult = await client.db("mod7database").collection("users").updateOne(
    { username: data.username }, 
    { 
      $set: {surveyDict: data.scoresDict}
    }
  ) 
  // console.log(updateResult)
  if(updateResult.matchedCount == 1) {
    if(updateResult.result.nModified > 0) {
      console.log("sucessfully inserted/updated survey data for user " + username)
    }
    else {
      console.log("no survey data update required for user " + username)
    }
    return true;
  }
  else {
    console.log("failed to insert survey data for user " + username) 
    return false;
  }
  
}
async function calculateGenreScores() {
  const userData = await client.db("mod7database").collection("users").findOne({username: username})
  if(userData) {
    let scoresDict = {}
    Object.keys(userData.surveyDict).forEach(function(key) {
      scoresDict[key] = userData.surveyDict[key] + 2*userData.artistsDict[key]
    })
    normalizeDict(scoresDict)

    //from https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
    // Create items array
    let topThreeGenres = Object.keys(scoresDict).map(function(key) {
      return [key, scoresDict[key]];
    }).sort(function(first, second) {
      return second[1] - first[1];
    }).slice(0, 3)
    //end of code edited from stackoverflow

    const pushScoresReturn = await client.db("mod7database").collection("users").updateOne(
      {username: username},
      {$set: {scoresDict: scoresDict, topThreeGenres: topThreeGenres}}
    )
    if(pushScoresReturn.matchedCount == 1) {
      if(pushScoresReturn.result.nModified > 0) {
        console.log("successfully calculated genre scores for user " + username + " and pushed/updated into database")
      }
      else{
        console.log("no genre score updated required for user " + username )
      }
      return true;
    }
    else if(pushScoresReturn.matchedCount > 1) {
      console.log("Problem! Multiple users with same username!!!! (" + username + ")")
    }
    else {
      console.log("failed to push genre scores for user " + username + " into database")
      return false;
    }
  }
  else {
    console.log("could not find user data for user " + username + " when trying to cacluate user genre scores")
    return false;
  }
}
async function matchUser() {
  client.db("mod7database").collection("users").find({}).toArray().then((data)=>{
    console.log("got data for all users")
    console.log(data)
  })
}
async function logArtists(data) {
  normalizeDict(data)
  const updateResult = await client.db("mod7database").collection("users").updateOne(
    { username: username }, 
    { 
      $set: {artistsDict: data}
    }
  )  
  if(updateResult.result.nModified > 0) {
    return true;
  }
  else {
    return false
  }
}

async function insertProfilePictureLink(link) {
  const updateResult = await client.db("mod7database").collection("users").updateOne(
    { username: username }, 
    { 
      $set: {profilePicture: link}
    }
  )
  if(updateResult.matchedCount == 1) {
    if(updateResult.result.nModified > 0) {
      console.log("sucessfully inserted/updated profile picture link for user " + username)
    }
    else {
      console.log("no profile picture link update required for user " + username)
    }
    return true;
  }
  else {
    console.log("failed to insert/update profile picture link for user " + username) 
    return false;
  } 
}
function normalizeDict(dictionary) {
  let normMax = 10;
  let decimals = 2;
  let max = 0;
  Object.values(dictionary).forEach(function(val) {
    if(val > max) {
      max = val;
    }
  })  
  Object.keys(dictionary).forEach(function(key) {
    var newVal = Math.round(dictionary[key]*normMax*Math.pow(10, decimals)/max)/Math.pow(10, decimals);
    dictionary[key] = newVal;
  })
}
init();