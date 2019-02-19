import NFCservices from '../services/NFCservices';

const reducer= (state={tagData:{}},action )=>{
    switch(action.type){
        case 'showOfflineData':
            
            return {
                ...state
            }
            // NFCservices.showDecryptedData(action.medicineInfo);
        case 'verifyOnline':
            NFCservices.verifyOnline()
        default:
            return{
                ...state
            }
    }
    
};

export default reducer;