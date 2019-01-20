const express = require('express');
const pharmaRouter = express.Router();
const pharmacontroller = require('../../controllers/pharmaController');

pharmaRouter.get('/getDetail/:serialNo', (req, res) => {
    pharmacontroller.getDetails(req.params.serialNo, (err,data) => {
        res.json(data)
    })

})


pharmaRouter.post('/checkSyrup',(req,res)=>{
    pharmacontroller.checkSyrup(req.body,(err,data)=>{
        console.log(data)
        res.json({data:data})
    })
})

module.exports = pharmaRouter;