const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();
const pharmaController = require('./controllers/pharmaController');
const dbinfo = require('./config/config').db;

let database;

const pharmaRouter = require('./api/routes/pharma_O2');
mongoose.connect(`mongodb://${dbinfo.name}:${dbinfo.password}@ds042128.mlab.com:42128/medicareapp`)
    .then(() => {
        console.log('mongodb is connected')
    })
    .catch(err => {
        console.log(err)
    })


// var mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://2015ag5744:F1tlF9lsDE6Rw8Fim0qiqCqZHyx4bt4NkYu6lJWZiTiZKbd4VawHqk8IlazhAYv4VOqwzPBWQnzgsk8GBjDcqw%3D%3D@2015ag5744.documents.azure.com:10255/?ssl=true", {useNewUrlParser: true},function (err, client) {
// database=client.db("testdb");
// console.log(database);
// // mongodb.collection('user', (err, collection) => {
// //     console.log(collection);
// // })
// // client.close();
// });




server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.post("/checkMedicine", function (req, res) {
    pharmaController.getMedicineDetailsAndUpdateStatus(req.body, function (err, output) {
        if (output) {
            pharmaController.getMedicineStatus(req.body, function (err, info) {
                res.json(info)
            })
        } else {
            pharmaController.addMedicineAndUpdateStatus(req.body, function (err, info) {
                res.json(info)
            })
        }
    });
})

server.post("/addUser", function (req, res) {
    pharmaController.addUser(req.body, function (err, data) {
        res.json(data);
    })
})

server.post("/getMeds", function (req, res) {
    pharmaController.getMed(req.body, function (err, data) {
        res.json(data);
    })
})



module.exports = { database };
server.use("/authentication", pharmaRouter);
// const port = process.env.PORT || 8888;
const port = 8888;

server.listen(port, () => `server is listening at port ${port}`)



