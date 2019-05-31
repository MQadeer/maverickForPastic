const hash = require('object-hash');
const mongoClient=require('mongodb').MongoClient;
const cosmosdb_string = require('../config/keys').cosmosdb_string;

class BlockChain {

    constructor() {
        //Create
        this.chain = [];
        //Transaction
        this.curr_transactions = null;
    }

    lastBock() {
        return this.chain.slice(-1)[0]; ///< we return and element 0 index (since the has only one)
    }

    isEmpty() {
        return this.chain.length == 0; ///< returns true if empty else false
    }

    addNewTransaction(userHash) {
        //Push the object to the Array
        this.curr_transactions=userHash;
        //Using ES6 the key and value pairs can be defined only by specifying the variable 
        mongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
        .then(client => {
            console.log("Connected successfully to server")
            let db=client.db('medicareapp');
            let chain=db.collection('UsersConsumptionBlockchain').find();
            chain.toArray((err,resp)=>{
                if(resp.length==0){
                    this.addNewBlock(null)
                }
                else{
                    let prevHash=resp[(resp.length-1)].hash;
                    this.addNewBlock(prevHash,userHash);
                }

            })
        
        })
    }
addNewBlock(prevHash,userHash) {
    let block = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: userHash,
        prevHash: prevHash,
    };
    //Put Hash
    this.hash = hash(block);
    console.log("new hash ",this.hash);
    mongoClient.connect(cosmosdb_string, { useNewUrlParser: true })
        .then(client => {
            console.log("Connected successfully to server")
            let db=client.db('maverick');
            let chain=db.collection('UsersConsumptionBlockchain')
            chain.insertOne({hash:this.hash,userInfoHash:userHash},function(err,response){
                console.log("hash added to db ",err || response);
            })
        
        })
    //Add to Chain
    // this.chain.push(block);
    this.curr_transactions = null;
    return block;
}

}
module.exports = BlockChain;