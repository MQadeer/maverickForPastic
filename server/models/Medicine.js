const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Medicines = new Schema({
    serialNo: {
        type: String,
        required: true
    },
    medicineName: {
        type: String,
        required: true
    },
    manufacturingDate: {
        type: String,
    },
    manufacturerName: {
        type: String,
    },
    expireDate: {
        type: String,

    },
    status: {
        type: String,
        required: true
    },
    soldOnDate:{
        type:String
    },
    batchId:{
        type:String
    },
    companyId:{
        type:String
    }


})


const Medicinesdb = mongoose.model('Medicines', Medicines);
module.exports = Medicinesdb;


