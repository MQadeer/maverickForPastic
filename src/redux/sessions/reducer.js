import NFCservices from '../services/NFCservices';
import QRservices from "../services/QRservices";
const reducer= (state={tagData:{}},action )=>{
    switch(action.type){
        case 'showOfflineData':
            
            return {
                ...state
            }
            // NFCservices.showDecryptedData(action.medicineInfo);
        case 'verifyOnline':
            NFCservices.verifyOnline();
        case 'QRverifyOnline':
            QRservices.verifyOnline(action.payload);
        default:
            return{
                ...state
            }
    }
    
};
export default reducer;