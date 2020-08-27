import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import UserReducer, { UserPreferencesState } from './userPreferences';
import GlobalReducer, { GlobalState } from './global';
import KMEANSAlgorithmReducer, { KMEANSState } from './kmeans.algorithm';
import DBSCANAlgorithmReducer, { DBSCANState } from './dbscan.algorithm';

const persistConfig = {
    key: 'user',
    storage,
};

export const rootReducer = combineReducers({
    userPreferences: persistReducer(persistConfig, UserReducer),
    global: GlobalReducer,
    kmeans: KMEANSAlgorithmReducer,
    dbscan: DBSCANAlgorithmReducer,
});

export interface RootState {
    userPreferences: UserPreferencesState;
    global: GlobalState;
    kmeans: KMEANSState;
    dbscan: DBSCANState;
}

export default rootReducer;
