const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const server = express();
const pharmaController = require('./controllers/pharmaController');
const QRcontroller=require('./controllers/QRcontroller');
const cosmosdb_string = require('./config/keys').cosmosdb_string;


server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.post("/checkMedicine", function (req, res) {
    
    console.log(req.body);
    MongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
        .then(client => {
            console.log("Connected successfully to server");

            const db = client.db('medicareapp');
            // assert.equal(null, err);

            pharmaController.getMedicineDetailsAndUpdateStatus(req.body, db, function (err, data) {
                if (err) throw console.log(err);
                res.json(data);
                client.close();
            })

        })
        .catch(err => {
            console.log(err.message);

        })
})

server.post("/addUser", function (req, res) {
    MongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
        .then(client => {
            console.log("Connected successfully to server");
            const db = client.db('medicareapp');
            // assert.equal(null, err);
            console.log("ok");
            pharmaController.addUser(req.body, db, function (err, data) {
                if (err) throw console.log(err);
                res.json(data);
                client.close();
            })

        })
        .catch(err => {
            console.log(err.message);

        })



})

server.post("/report",function(req,res){
    MongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
    .then(client => {
        console.log("Connected successfully to server");
        const db = client.db('medicareapp');
        // assert.equal(null, err);

        pharmaController.addReport(req.body, db, function (err, data) {
            if (err) {
                res.json({done:false});
            }else{
                res.json({done:true});
            }
            
            client.close();
        })

    })
    .catch(err => {
        console.log(err.message);

    })
})

server.get("/getNews", function (req, res) {
    MongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
    .then(client => {
        console.log("Connected successfully to server");
        const db = client.db('medicareapp');
        // assert.equal(null, err);

        pharmaController.getNews(db, function (err, data) {
            if (err) throw console.log(err);
            res.json(data);
            client.close();
        })

    })
    .catch(err => {
        console.log(err.message);

    })  
})

server.post("/QRCheckMedicine", function (req, res) {
    
    console.log(req.body);
    MongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
        .then(client => {
            console.log("Connected successfully to server");

            const db = client.db('medicareapp');
            // assert.equal(null, err);

            QRcontroller.getMedicineDetailsAndUpdateStatus(req.body, db, function (err, data) {
                if (err) throw console.log(err);
                res.json(data);
                client.close();
            })

        })
        .catch(err => {
            console.log(err.message);

        })
})

server.get('/', function (req,res){
    res.send('server is working');
})

server.use(express.static('./static'))
const port = process.env.PORT || 3000;

server.listen(process.env.PORT || 3000,'0.0.0.0', () => {console.log(`server is listening at port ${port}`)});