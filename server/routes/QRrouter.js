const express=require('express');
const QRrouter=express.Router();
const cosmosdb_string = require('../config/keys').cosmosdb_string;
const MongoClient=require('mongodb').MongoClient;
const QRcontroller=require('../controllers/QRcontroller');

QRrouter.post("/checkMedicine", function (req, res) {
    
    console.log(req.body);
    MongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
        .then(client => {
            console.log("Connected successfully to server");

            const db = client.db('maverick');
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



module.exports= QRrouter;