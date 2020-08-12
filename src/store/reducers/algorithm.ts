import { AlgorithmActionTypes } from "../types/algorithm.types";

interface State {
  render:any []
}

const initialState:State = {
    render:[]
}

interface Action {
    type:AlgorithmActionTypes,
    payload?:any
}

export default (state:State=initialState,action:Action):State=> {

    switch(action.type){
        case AlgorithmActionTypes.ADD_TO_RENDER:
            return {...state,render:[...state.render,action.payload]};
        case AlgorithmActionTypes.REDUCE_DATA:
            return {...state,render:[...state.render.slice(action.payload)]}

        case AlgorithmActionTypes.POP_RENDER:
            const temp = [...state.render];
            temp.pop();
            return {...state,render:temp};
        case AlgorithmActionTypes.SET_RENDER:
            return {...state,render:action.payload};
        
        case AlgorithmActionTypes.RESET_DATA:
            return initialState;
        default:
            return state;
    }
}
