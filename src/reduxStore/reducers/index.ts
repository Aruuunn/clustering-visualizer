import { combineReducers } from "redux";
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import UserReducer, { UserPreferencesState } from './userPreferences';
import GlobalReducer, { GlobalState } from './global';
import KMEANSAlgorithmReducer, { KMEANSState } from './kmeans.algorithm';

const persistConfig = {
    key: 'user',
    storage,
  }
   

export const rootReducer = combineReducers({
    userPreferences:persistReducer(persistConfig,UserReducer),
    global:GlobalReducer,
    kmeans:KMEANSAlgorithmReducer
});



export interface RootState {
  userPreferences:UserPreferencesState,
  global:GlobalState,
  kmeans:KMEANSState
}



export default rootReducer;