const Blockchain = require('../blockChain/UsersBlockchain');
const blockchain = new Blockchain();
const hash = require('object-hash');


module.exports = {
    getMedicineDetailsAndUpdateStatus: (data, db, cb) => {
        let check = true;
        let medInfo = data.medicineInfo;
        let medicineFound = {};
        console.log(data);
        const Pharma = db.collection('medicines');
        const Users = db.collection('users');

        Pharma.find({ productId: medInfo.info }).toArray((err, doc) => {

            if (doc.length >= 1) {
                if (doc[0].status == "new") {
                    Pharma.updateOne(
                        { productId: medInfo.info },
                        { $set: { status: "sold", soldOnDate: medInfo.buyingDate } },
                        (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            medicineFound = doc[0];
                            updateUserBoughtMeicine(medInfo);
                            // cb(err,doc)
                        })
                }
                else {
                    Pharma.find(
                        { productId: medInfo.info },
                        (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            medicineFound = doc[0];
                            updateUserBoughtMeicine(medInfo);
                            // cb(err,doc)
                        })
                }

            }
            else {
                console.log('medicine not found')
                cb(null, false);
            }
        })

        function updateUserBoughtMeicine() {
            Users.find({ name: data.user.name, email: data.user.email }).toArray((err, result) => {
                console.log(result[0])
                if (result.length == 0) {
                    console.log('user not found')
                    cb(err, result)
                }
                else if (result.length >= 1) {

                    const checkproductIdExist = result[0].medicineBought.filter((item) => {
                        return item.productId == medInfo.productId
                    })
                    console.log(checkproductIdExist)
                    if (checkproductIdExist.length > 0) {
                        // cb(err,checkproductIdExist)
                        cb(err, medicineFound)
                    }
                    else {
                        let hashedData = hash({
                            name: data.user.name,
                            email: data.user.email,
                            medicineBought: [...result[0].medicineBought, data.medicineInfo]
                        });
                        data.medicineInfo.hash = hashedData;
                        result = {
                            name: data.user.name,
                            email: data.user.email,
                            medicineBought: [...result[0].medicineBought, data.medicineInfo]
                        }

                        Users.updateOne({ email: result.email },
                            { $set: { medicineBought: result.medicineBought } },
                            (err, res) => {
                                blockchain.addNewTransaction(hashedData)
                                console.log("Updated the document with the field");
                                // cb(err,res);
                                cb(err, medicineFound);
                            })
                    }
                }
            })
        }
    },

    getMedicineStatus: (data, db, cb) => {
        const medInfo = data.medicneInfo
        const collection = db.collection('medicine');

        collection.find({ productId: medInfo.productId }, (err, result) => {
            if (err) throw err;
            cb(err, result)
        })

    },

    addMedicineAndUpdateStatus: (data, db, cb) => {
        const medInfo = data.medicinceInfo
        const pharma = db.collection('medicine');
        pharma.updateOne(
            { productId: medInfo.productId },
            { $set: { status: "sold" } },
            (err, result) => {
                if (err) throw err;
                cb(err, result)
            })
    },


    addUser: (userInfo, db, cb) => {

        const collection = db.collection('users');
        // Found some documents
        collection.find({ email: userInfo.email }).toArray(function (err, docs) {

            console.log(docs);
            if (docs.length == 0) {
                collection.insertOne({
                    email: userInfo.email,
                    name: userInfo.name,
                    medicineBought: []

                }, function (err, result) {
                    console.log("Inserted 1 document into the collection");
                    let userdata = {
                        email: userInfo.email,
                        name: userInfo.name,
                        medicineBought: []
                    }
                    cb(err, userdata);
                });
            }
            else {
                console.log("Found the following records");
                console.log(docs)
                cb(null, docs[0]);
            }
        });



    },
    addReport: (info, db, cb) => {
        const collection = db.collection('complains');
        // Found some documents
        collection.insertOne({ complain: info }, function (err, result) {
            console.log("Inserted 1 report into collection");
            cb(err, result);
        });
    },
    getNews: (db, cb) => {
        const collection = db.collection('news');
        collection.find().toArray(function (err, docs) {
            cb(err, docs);
        })

    }

}