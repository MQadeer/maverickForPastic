const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    medicineBought:{
        type:Array
    }

})


const UsersDb = mongoose.model('Users', Users);
module.exports = UsersDb;


