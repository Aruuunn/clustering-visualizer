import { HierarchicalActionTypes,HierarchicalClusteringType } from '../types';

export interface HierarchicalState {
    numberOfClusters: number;
    type:HierarchicalClusteringType
}

export interface HierarchicalAction {
    type:HierarchicalActionTypes;
    payload:number | HierarchicalClusteringType;
}


const initialState:HierarchicalState = {
    numberOfClusters:1,
    type:HierarchicalClusteringType.AGGLOMERATIVE
}


export default (state:HierarchicalState=initialState,action:HierarchicalAction):HierarchicalState =>{
    switch(action.type){
        case HierarchicalActionTypes.SET_NUMBER_OF_CLUSTERS:
            return {...state,numberOfClusters:action.payload as number};
        case HierarchicalActionTypes.SET_TYPE:
            return {...state,type:action.payload as HierarchicalClusteringType};
        default:
        return state;
    }
}
 