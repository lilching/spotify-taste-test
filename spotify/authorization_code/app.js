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



//var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const port = 8888;

var client_id = '179d99dacbac467497c807bbabe53630'; // Your client id
var client_secret = '02f0f9b272074c48b65b523dd5d8d0bc'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

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
  var scope = 'user-read-private user-read-email';
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
        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
          console.log(body.display_name)
        });
        
        var options_top = {
          url: 'https://api.spotify.com/v1/me/top/artists', //?time_range=short_term&limit=10&offset=0
          headers: {'Authorization': 'Bearer ' + access_token }, //'Accept': 'application/json', 'Content-Type': 'application/json',
          json: true
          // json: {limit:10, time_range: "short_term"}
        } 

        request.get(options_top, function(error, response, body) {
          console.log("top songs and artists log")
          console.log(body)
          //console.log(response)
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

// console.log('Listening on 8888');
// app.listen(port);








app.get('/', (request, response)=> {
  response.sendFile(path.join(process.cwd() + '/public/login.html'));
  
});
app.listen(port, ()=>{
  console.log("listening on port " + port )
})

async function init() {
  
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    // await client.close();
  }
}

async function registerUser(client, userData){
  var res2 = await client.db("mod7database").collection("users").findOne({username: userData.username})
  console.log("checking if username exists:")
  console.log(res2)
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
async function loginUser(client, userData){
  await client.connect();
  const res2 = await client.db("mod7database").collection("users").findOne({username: userData.username})
  console.log("checking if username exists:")
  console.log(res2)
  if(res2.username == userData.username) {
    if(passwordHash.verify(userData.password, res2.hashedPassword)) {
      console.log("here where we log the mofo in")
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
app.post("/register-user", (req, res)=> {
  let userData = {username: req.body.username, password: req.body.password}
  registerUser(client, userData).then((value)=> {
    if(value) {
      username = req.body.username
      console.log("Registered user " + username)
      res.json({success: true, message: "Sucessefully registered user", link: "http://localhost:8888/spotifyLogin.html"})
    }
    else {
      console.log("User attempted to register with a username that already existed")
      res.json({sucess: false, message: "A user with that username already exists"})
    }
  }) 
})
app.post("/login-user", (req, res)=> {
  let userData = {username: req.body.username, password: req.body.password}
  loginUser(client, userData).then((value)=> {
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


init();