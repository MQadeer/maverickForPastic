const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Syrups = new Schema({
    serialNo: {
        type: String,
        required: true
    },
    medicineName: {
        type: String,
        required: true
    },
    manufacturingDate: {
        type: Date,
        default: Date.now,

    },
    manufacturerName: {
        type: String,
    },
    expireDate: {
        type: Date,

    },
    status: {
        type: String,
        required: true
    },
    openedOnDate:{
        type:Array
    }

})


const Syrupsdb = mongoose.model('Syrups', Syrups);
module.exports = Syrupsdb;


