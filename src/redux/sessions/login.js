import loginServices from '../services/loginServices';

const login= (state={userHistory:[]},action )=>{
    switch(action.type){
        case 'login':
            console.log("login func called")
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