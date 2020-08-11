import GlobalActionTypes from "../types/global.types";
import { AlgorithmNames } from "../../common/algorithms.enum";

interface State {
    algorithm:AlgorithmNames | null;
    numberOfClusters:number;
    start:boolean;
    coordinatesOfNodes:number[][]
}

interface Action {
    type: GlobalActionTypes ;
    payload?:any;
}

let initialState:State = {
    algorithm:null,
    numberOfClusters:0,
    start:false,
    coordinatesOfNodes:[]
}


export default (state:State = initialState,action:Action) => {

    switch(action.type){
        case GlobalActionTypes.SET_ALGORITHM:
            return {...state,algorithm:action.payload};

        case GlobalActionTypes.SET_COORDINATES_OF_NODES:
            return {...state,coordinatesOfNodes:action.payload};

        case GlobalActionTypes.SET_NUMBER_OF_CLUSTERS:
            return {...state,numberOfClusters:action.payload};

        case GlobalActionTypes.RESET:
            return initialState;

        case GlobalActionTypes.START_VISUALIZATION:
            
            if(state.coordinatesOfNodes.length===0 || state.start || state.numberOfClusters<=1 ){
                return state;
            }
            return {...state,start:true};

        default:
            return state;
    }

}