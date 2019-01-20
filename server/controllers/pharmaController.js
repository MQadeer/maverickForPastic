const Syrupsdb = require('../models/Syrups');
const Users=require('../models/Users')


getTagMessage=function(info){
    return info;
}


module.exports = {
    getSyrupDetailsAndUpdateStatus: (Info,  cb) => {
        
        let tagMessage=getTagMessage(Info.data);
        Users.findOneAndUpdate({userName:Info.user.name, userEmail:Info.user.email},
        {$push:{medicineBought:{$each:[Info.data]}}},{upsert:true},function(err,data){
            console.log(data);
        })
        // Syrupsdb.findOneAndUpdate({serialNo:Info.data.serialNo,openedOnDate:undefined},
        // {status:"used",openedOnDate:Info.CurrentTime},{upsert:true},cb);
        
        
    },

    addUser:(userInfo,cb)=>{
        Users.findOne({userName: userInfo.name, userEmail:userInfo.email},function(err,user){
            if(err!=null){
                let user=new Users();
                user.userName=userInfo.name;
                user.userEmail=userInfo.email;
                user.save(cb)
                
            }
            else {
                cb(err,user);
            }
        })
    }
    
}