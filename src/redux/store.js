import {createStore, combineReducers} from 'redux';
import reducer from './sessions/reducer';
import login from './sessions/login';


const store=createStore(combineReducers({login,reducer}));

export default store;