import GlobalActionTypes from "../types/global.types";
import { AlgorithmNames } from "../../common/algorithms.enum";

interface State {
    algorithm:AlgorithmNames | null;
    numberOfClusters:number;
    start:boolean;
}

interface Action {
    type: GlobalActionTypes ;
    payload?:any;
}

let initialState:State = {
    algorithm:null,
    numberOfClusters:0,
    start:false
}


export default (state:State = initialState,action:Action) => {

    switch(action.type){
        case GlobalActionTypes.ADD_NODE:
            return state;
        case GlobalActionTypes.SET_NUMBER_OF_CLUSTERS:
            return {...state,numberOfClusters:action.payload};
        default:
            return state;
    }

}