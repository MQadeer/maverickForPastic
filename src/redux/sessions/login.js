import loginServices from '../services/loginServices';

const login= (state={userHistory:[]},action )=>{
    switch(action.type){
        case 'login':
            loginServices.addUser(action.user);
            return {
                ...state
            }
        case 'showUserHistory':
                
            return{userHistory:action.payload}
        
        default:
            return{
                ...state
            }
    }
    
};

export default login;