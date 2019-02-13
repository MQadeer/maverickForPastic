const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const geocoding =new require('reverse-geocoding');
const reverse = require('reverse-geocode');
const geocodor=require('geocoder');

const server = express();

const pharmaController = require('./controllers/pharmaController');

const pharmaRouter = require('./api/routes/pharma_O2');

const cosmosdb_string = require('./config/keys').cosmosdb_string;

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.post("/checkMedicine", function (req, res) {
    MongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
        .then(client => {
            console.log("Connected successfully to server");

            const db = client.db('pharma');
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
    // console.log("body ",req.body);
    // pharmaController.getMedicineDetailsAndUpdateStatus(req.body, function (err,output) {
    //     if(output){
    //         pharmaController.getMedicineStatus(req.body,function(err,info){
    //             res.json(info)
    //         })
    //     } else{
    //         pharmaController.addMedicineAndUpdateStatus(req.body,function(err,info){
    //             res.json(info)
    //         })
    //     }
    // res.json(data);
    // });
})

server.post("/addUser", function (req, res) {
    


    MongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
        .then(client => {
            console.log("Connected successfully to server");
            geocodor.reverseGeocode(33.7489, -84.3789,function(err,data){
                console.log("data",data)});
            // console.log(reverse.lookup(50.447444, -104.418513));
            // var config = {
            //     'latitude': 40.00403611111111,
            //     'longitude': 116.48485555555555
            // };
            // geocoding.location(config, function (err, data){
            //     if(err){
            //         console.log(err);
            //     }else{
            //         console.log("location ",data);
            //     }
            // });

            const db = client.db('pharma');
            // assert.equal(null, err);

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

server.post("/getMeds", function (req, res) {
    pharmaController.getMed(req.body, function (err, data) {
        res.json(data);
    })
})



server.use("/authentication", pharmaRouter);
const port = 8888;

server.listen(port, () => console.log(`server is listening at port ${port}`))



