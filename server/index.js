const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();
const  pharmaController =require ('./controllers/pharmaController');

const pharmaRouter = require('./api/routes/pharma_O2');
// const db = require('mongodb://mqadeer123:mqadeer123@ds042128.mlab.com:42128/medicareapp');
mongoose.connect('mongodb://mqadeer123:mqadeer123@ds042128.mlab.com:42128/medicareapp')
    .then(() => {
        console.log('mongodb is connected')
    })
    .catch(err => {
        console.log(err)
    })



server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.post("/checkSyrup", function (req, res) {
    console.log(req.body);
    pharmaController.getSyrupDetailsAndUpdateStatus(req.body, function (err, data) {
        console.log(data)
        res.json({details: data});
    });
})

server.post("/user",function(req,res){
    console.log(req.body);
    pharmaController.addUser(req.body,function(err,data){
        res.json({payload:data});
    })
})

server.use("/authentication", pharmaRouter);
const port = 8888;
server.listen(port, () => `server is listening at port ${port}`)



