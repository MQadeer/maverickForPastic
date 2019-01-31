const Medicinesdb = require('../models/Medicine');
const Users = require('../models/Users')



module.exports = {
    getMedicineDetailsAndUpdateStatus: (data, cb) => {
        let check = true;
        let medInfo = data.medicineInfo.info;
        console.log(data);
        Users.findOne({ userName: data.user.name, userEmail: data.user.email, }, function (err, res) {
            if (res.medicineBought.length!= 0) {
                if (check) {
                    for (let i = 0; i <res.medicineBought.length; i++) {
                        if ( medInfo.tagId === res.medicineBought[i].info.tagId) {
                            medInfo.lastscanned = data.buyingDate;
                            console.log("med already exists ")

                            cb(err, true);
                            break
                        } else {
                            check = false
                        }
                    }
                }
                else {
                    cb(err, false);
                }
            } else {
                cb(err, false);
            }
            // res.medicineBought.forEach(element => {

            //     if (medInfo.tagId === element.info.tagId) {
            //         medInfo.lastscanned = data.buyingDate;
            //         console.log("med already exists ")
            //         cb(err, true);
            //     }
            //     else {
            //         cb(err, false);
            //     }
            // });
        })
    },

    getMedicineStatus: (data, cb) => {
        let medInfo = data.medicineInfo.info;
        Medicinesdb.findOne({ serialNo: medInfo.tagId }, function (err, res) {
            cb(err, res)
        })
    },

    addMedicineAndUpdateStatus: (data, cb) => {
        let medInfo = data.medicineInfo.info;
        Users.findOneAndUpdate({ userName: data.user.name, userEmail: data.user.email },
            { $push: { medicineBought: { $each: [data.medicineInfo] } } }, { upsert: true }, function (err, info) {
                console.log(info);
                Medicinesdb.findOneAndUpdate({ serialNo: medInfo.tagId },
                    { status: "sold", soldOnDate: data.buyingDate }, { upsert: true }, function (err, res) {
                        console.log("data updated");
                        cb(err, res)
                    });
            })
    },
    getMed:(data,cb)=>{
        Users.findOne({ userName: data.name, userEmail: data.email }, function (err, info) {
            cb(err,info);
        })
    },
    addUser: (userInfo, cb) => {
        Users.findOne({ userName: userInfo.name, userEmail: userInfo.email }, function (err, user) {
            if (user == null) {
                let user = new Users();
                user.userName = userInfo.name;
                user.userEmail = userInfo.email;
                console.log("user saved")
                user.save(cb)

            }
            else {
                console.log("user already exists");
                cb(err, user);
            }
        })
    }
}