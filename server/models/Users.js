const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoClient=require('mongodb').MongoClient;



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


