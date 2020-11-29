//from Github at https://github.com/nodejs/node/issues/33741
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


var {MongoClient} = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;
// console.log("asd;flkajsdf;laksjdf;laskdj")
// import Express from "express"

const uri = "mongodb+srv://mod7root:mod7pass@mod7cluster.ygyyw.mongodb.net/mod7database?retryWrites=true&w=majority"
const client = new MongoClient(uri);

const app = express();
const port = 3456;


app.use(express.static('public_node'))

app.get('/', (request, response)=> {
    // response.send(path.join(import.meta.url + '/home.html'));
    response.sendFile(path.join(process.cwd() + '/public_node/home.html'));
    // response.sendFile(path.join(__dirname + '/home.html'));

});

app.post("/register", (req, res)=> {
    // console.log(req.data.username)
    // console.log(req.body.username)
    console.log(req)

})

app.listen(port, ()=> console.log("listening on port " + port ))



// const MongoClient = require('mongodb').MongoClient;
// 	const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
// MongoClient.connect(uri, function(err,db){

// })

