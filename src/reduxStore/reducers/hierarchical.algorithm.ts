import { HierarchicalActionTypes } from '../types/';

export interface HierarchicalState {
    numberOfClusters: number;
}

export interface HierarchicalAction {
    type:HierarchicalActionTypes;
    payload:number;
}


const initialState:HierarchicalState = {
    numberOfClusters:1
}


export default (state:HierarchicalState=initialState,action:HierarchicalAction):HierarchicalState =>{
    switch(action.type){
        case HierarchicalActionTypes.SET_NUMBER_OF_CLUSTERS:
            return {...state,numberOfClusters:action.payload};
        default:
        return state;
    }
}
 