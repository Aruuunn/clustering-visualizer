import { combineReducers } from "redux";
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import UserReducer from './userData';
import GlobalReducer from './global';
import AlgorithmReducer from './algorithm';

const persistConfig = {
    key: 'user',
    storage,
  }
   

export const rootReducer = combineReducers({
    user:persistReducer(persistConfig,UserReducer),
    global:persistReducer(persistConfig,GlobalReducer),
    algo:AlgorithmReducer
});

export default rootReducer;