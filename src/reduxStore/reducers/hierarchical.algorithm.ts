import { HierarchicalActionTypes, HierarchicalClusteringType } from '../types';

import HashTable from '../../common/hashtable';

export interface HierarchicalState {
    numberOfClusters: number;
    type: HierarchicalClusteringType;
    silhouetteScores: HashTable<number> | null;
}

export interface HierarchicalAction {
    type: HierarchicalActionTypes;
    payload: number | HierarchicalClusteringType | HashTable<number> | null;
}

const initialState: HierarchicalState = {
    numberOfClusters: 1,
    type: HierarchicalClusteringType.AGGLOMERATIVE,
    silhouetteScores: null,
};

export default (state: HierarchicalState = initialState, action: HierarchicalAction): HierarchicalState => {
    switch (action.type) {
        case HierarchicalActionTypes.SET_NUMBER_OF_CLUSTERS:
            return { ...state, numberOfClusters: action.payload as number };
        case HierarchicalActionTypes.SET_TYPE:
            return { ...state, type: action.payload as HierarchicalClusteringType };
        case HierarchicalActionTypes.SET_SILHOUETTE_SCORES:
            return { ...state, silhouetteScores: action.payload as HashTable<number> | null };
        default:
            return state;
    }
};
