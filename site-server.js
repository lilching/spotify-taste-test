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


const app = express();
const port = 3456;
//from @https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var {MongoClient} = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://mod7root:mod7pass@mod7cluster.ygyyw.mongodb.net/mod7database?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });




// MongoClient.connect(uri, function(err, db) {
//     if(err) throw err;
//     var dbo = db.db("mydb");
//     var myobj
// })

app.use(express.static('public_node'))
app.use(express.static('web-api-auth-examples'))

app.get('/', (request, response)=> {
    // response.send(path.join(import.meta.url + '/home.html'));
    response.sendFile(path.join(process.cwd() + '/public_node/home.html'));
    // response.sendFile(path.join(__dirname + '/home.html'));

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

// async function usernameExists(client, userData) {
//     try {
//         await client.connect();
//         const res2 = await client.db("mod7database").collection("users").findOne({username: userData.username})
//         console.log("checking if username exists:")
//         console.log(res2)
//         if(res2) {
//             console.log("true")
//             return true;
//         }
//         else {
//             console.log("false")
//             return false;
//         }
//     }
//     catch (e) {
//         console.error(e);
//     } 
//     finally {
//         await client.close();
//     }
// }
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
app.post("/register", (req, res)=> {
    let userData = {username: req.body.username, password: req.body.password}
    registerUser(client, userData).then((value)=> {
        if(value) {
            res.json({success: true, message: "Sucessefully inserted user into db"})
        }
        else {
            res.json({sucess: false, message: "A user with that username already exists"})
        }
    }) 
})
app.post("/login", (req, res)=> {
    let userData = {username: req.body.username, password: req.body.password}
    loginUser(client, userData).then((value)=> {
        if(value) {
            res.json({success: true, message: "Sucessefully logged in"})
        }
        else {
            res.json({sucess: false, message: "Username/password mismatch"})
        }
    }) 
})





// const MongoClient = require('mongodb').MongoClient;
// 	const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
// MongoClient.connect(uri, function(err,db){

// })


init();