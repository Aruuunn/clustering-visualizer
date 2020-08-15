import GlobalActionTypes from "../types/global.types";
import { AlgorithmNames } from "../../common/algorithms.enum";
import { Speed } from "../../common/speed.enum";
import KMEANSMode from "../../common/kmeans.mode.enum";

export interface Node {
    id:number;
    coordinates:number[]
}

interface State {
    algorithm:AlgorithmNames | null;
    numberOfClusters:number;
    start:boolean;
    speed:Speed;
    coordinatesOfNodes:Node[],
    learnMode:boolean;
    mode?:KMEANSMode;
    maxIterations?:number;
}

interface Action {
    type: GlobalActionTypes ;
    payload?:any;
}

let initialState:State = {
    algorithm:null,
    numberOfClusters:0,
    start:false,
    speed:Speed.faster,
    coordinatesOfNodes:[],
    learnMode:false,
    mode:KMEANSMode.SingleIteration,
    maxIterations:1
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
        case GlobalActionTypes.END_VISUALIZATION:
            return {...state,start:false};

        case GlobalActionTypes.SET_SPEED:
            return {...state,speed:action.payload};

        case GlobalActionTypes.UPDATE_COORDINATES:
            const { id ,coordinates } = action.payload;
            return {...state,coordinatesOfNodes:state.coordinatesOfNodes.map((o) => {
                if(o.id===id){
                  return {id,coordinates};
                }
                else return o;
            })}
        case GlobalActionTypes.SET_LEARN_MODE:
            return {...state,learnMode:action.payload};
        case GlobalActionTypes.SET_ITERATION_MODE:
            return {...state,mode:action.payload}
        
        case GlobalActionTypes.SET_MAX_ITERATIONS:
            return {...state,maxIterations:action.payload}

        default:
            return state;
    }

}