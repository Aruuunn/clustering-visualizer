import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import UserReducer, { UserPreferencesState } from './userPreferences';
import GlobalReducer, { GlobalState } from './global';
import KMEANSAlgorithmReducer, { KMEANSState } from './kmeans.algorithm';
import DBSCANAlgorithmReducer, { DBSCANState } from './dbscan.algorithm';
import MeanShiftAlgorithmReducer, { MeanShiftState } from './mean-shift.algorithm';
import AlgorithmReducer, { AlgorithmState } from './algorithm';
import HierarchicalAlgorithmReducer, { HierarchicalState } from './hierarchical.algorithm';

export * from './dbscan.algorithm';
export * from './kmeans.algorithm';
export * from './userPreferences';
export * from './mean-shift.algorithm';
export * from './algorithm';

const persistConfig = {
    key: 'user',
    storage,
};

export const rootReducer = combineReducers({
    userPreferences: persistReducer(persistConfig, UserReducer),
    global: GlobalReducer,
    kmeans: KMEANSAlgorithmReducer,
    dbscan: DBSCANAlgorithmReducer,
    meanShift: MeanShiftAlgorithmReducer,
    algorithm: AlgorithmReducer,
    hierarchical: HierarchicalAlgorithmReducer,
});

export interface RootState {
    userPreferences: UserPreferencesState;
    global: GlobalState;
    kmeans: KMEANSState;
    dbscan: DBSCANState;
    meanShift: MeanShiftState;
    algorithm: AlgorithmState;
    hierarchical: HierarchicalState;
}

export default rootReducer;
