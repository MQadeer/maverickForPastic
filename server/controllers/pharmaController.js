const Medicinesdb = require('../models/Medicine');
const assert = require('assert');
const reversecode=require('reverse-geocoding');


module.exports = {
    getMedicineDetailsAndUpdateStatus: (data,db, cb) => {
        let check = true;
        let medInfo = data.medicineInfo;
        let medicineFound={};
        console.log(data);
        const Pharma = db.collection('pharma');
        const Users = db.collection('user');
            
            Pharma.find({tagId:medInfo.tagId}).toArray((err,doc)=>{

                if(doc.length >= 1){

                    Pharma.updateOne(
                        {tagId:medInfo.tagId},
                        {$set:{ status:"sold"}},
                        (err,result)=>{
                            if(err) throw err;
                            console.log(result);
                            medicineFound=doc[0];
                            updateUserBoughtMeicine();
                            // cb(err,doc)
                        })
                        
                }
                else{
                    console.log('medicine not found')
                    cb(null,false);
                }
            })

        function updateUserBoughtMeicine(){
            Users.find({name:data.user.name,email:data.user.email}).toArray((err,result)=>{
                console.log(result[0])
                if(result.length == 0){
                    console.log('user not found')
                    cb(err,result)
                }
                else if(result.length >= 1){
                
                        const checkTagIdExist = result[0].medicineBought.filter((item)=>{
                            return item.tagId == medInfo.tagId
                        })
                        console.log(checkTagIdExist)
                        if (checkTagIdExist.length > 0){
                            // cb(err,checkTagIdExist)
                            cb(err,medicineFound)
                        }
                        else {
                            result = {
                                name:data.user.name,
                                email:data.user.email,
                                medicineBought:[...result[0].medicineBought,data.medicineInfo]
                             }
                            
                             Users.updateOne({email:result.email},
                                {$set:{medicineBought:result.medicineBought}},
                                (err,res)=>{
                                
                                console.log("Updated the document with the field");
                                // cb(err,res);
                                cb(err,medicineFound);
                             })
                        }
                }    
            })
        }
    },

    getMedicineStatus: (data,db, cb) => {
        const medInfo = data.medicneInfo
        const collection = db.collection('pharma');

        collection.find({tagId:medInfo.tagId},(err,result)=>{
            if (err) throw err ;
            cb (err,result)
        })
    
    },

    addMedicineAndUpdateStatus: (data,db, cb) => {
    const medInfo = data.medicinceInfo
    const pharma = db.collection('pharma');
    pharma.updateOne(
        {tagId:medInfo.tagId},
        {$set:{ status:"sold"}},
        (err,result)=>{
            if(err) throw err;
            cb(err,result)
        })
    },
    getMed:(data,cb)=>{
        Users.findOne({ userName: data.name, userEmail: data.email }, function (err, info) {
            cb(err,info);
        })
    },
    addUser: (userInfo,db, cb) => {

        const collection = db.collection('user');
        // Found some documents
        collection.find({email:userInfo.email}).toArray(function(err, docs) {
        
          console.log(docs);
         if(docs.length == 0){
            collection.insertOne({
                email:userInfo.email,
                name:userInfo.name,
                medicineBought:[]

            }, function(err, result) {
                console.log("Inserted 1 document into the collection");
                cb(err,result);
              });
         }
       else{
        console.log("Found the following records");
        console.log(docs)
        cb(null,docs);
       }
        });

       
       
    }
}