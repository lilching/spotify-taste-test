import Express from "express"

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://mod7root:mod7pass@mod7cluster.ygyyw.mongodb.net/mod7database?retryWrites=true&w=majority"
const client = new MongoClient(uri);

const app = Express();
const port = 3456;

//GET --- app.get()
//PUT --- app.put()
//POST --- app.post()
//DELTE --- app.delete()
app.use(Express.static('public_node'))
app.get("/", (req, res)=> {
    res.send("asdfasdf")
})

app.listen(port, ()=> console.log("listening on port " + port ))



const MongoClient = require('mongodb').MongoClient;
	const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
MongoClient.connect(uri, function(err,db){

})

