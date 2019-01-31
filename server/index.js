const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();
const  pharmaController =require ('./controllers/pharmaController');
const Medicine=require('./models/Medicine')

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

server.post("/checkMedicine", function (req, res) {
    console.log("body ",req.body);
    pharmaController.getMedicineDetailsAndUpdateStatus(req.body, function (err,output) {
        if(output){
            pharmaController.getMedicineStatus(req.body,function(err,info){
                res.json(info)
            })
        } else{
            pharmaController.addMedicineAndUpdateStatus(req.body,function(err,info){
                res.json(info)
            })
        }
        // res.json(data);
    });
})

server.post("/addUser",function(req,res){
    pharmaController.addUser(req.body,function(err,data){
        res.json(data);
    })
})

server.post("/getMeds",function(req,res){
    pharmaController.getMed(req.body,function(err,data){
        res.json(data);
    })
})



server.use("/authentication", pharmaRouter);
const port = 8888;
server.listen(port, () => `server is listening at port ${port}`)



