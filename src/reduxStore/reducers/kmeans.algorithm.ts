import { KMEANSAlgorithmActionTypes } from '../types/KMEANS.algorithm.types';
import KMEANSMode from '../../common/kmeans.mode.enum';
import { ReactElement } from 'react';


export type Variance = {
    total:number;
    colors:string[];
    variances:number[];
    labels:string[]
}

export type DetailedInfo =  { render: ReactElement[]; variances: Variance[] };



export interface KMEANSState {
    render: ReactElement[];
    mode: KMEANSMode;
    maxIterations: number;
    numberOfClusters: number;
    currentIteration: number | null;
    info: null | Variance | DetailedInfo[]; // stores variance in case of SingleIteration Mode or else stores the variance and last state of render of previous iterations
    showInfo: boolean;
}

const initialState: KMEANSState = {
    render: [],
    mode: KMEANSMode.SingleIteration, 
    maxIterations: 1,
    numberOfClusters: 0,
    info: null,
    currentIteration: null,
    showInfo: false,
};

interface Action {
    type: KMEANSAlgorithmActionTypes;
    payload?: any;
}

export default (state: KMEANSState = initialState, action: Action): KMEANSState => {
    switch (action.type) {
        case KMEANSAlgorithmActionTypes.ADD_TO_RENDER:
            return { ...state, render: [...state.render, action.payload] };
        case KMEANSAlgorithmActionTypes.REDUCE_DATA:
            if (!action.payload || state.render.length / action.payload < 2) {
                return state;
            }
            return { ...state, render: [...state.render.slice(action.payload)] };

        case KMEANSAlgorithmActionTypes.SET_NUMBER_OF_CLUSTERS:
            return { ...state, numberOfClusters: action.payload };

        case KMEANSAlgorithmActionTypes.POP_RENDER:
            const temp = [...state.render];
            temp.pop();
            return { ...state, render: temp };
        case KMEANSAlgorithmActionTypes.SET_RENDER:
            return { ...state, render: action.payload };

        case KMEANSAlgorithmActionTypes.SET_ITERATION_MODE:
            return { ...state, mode: action.payload };

        case KMEANSAlgorithmActionTypes.SET_MAX_ITERATIONS:
            return { ...state, maxIterations: action.payload };

        case KMEANSAlgorithmActionTypes.RESET_DATA:
            return { ...state, render: [] };

        case KMEANSAlgorithmActionTypes.SET_INFO:
            return { ...state, info: action.payload };

        case KMEANSAlgorithmActionTypes.SET_CURRENT_ITERATION:
            return { ...state, currentIteration: action.payload };

        case KMEANSAlgorithmActionTypes.SET_SHOW_INFO:
            return { ...state, showInfo: action.payload };
        case KMEANSAlgorithmActionTypes.ADD_TO_INFO:
            return {...state,info:[...(state.info as DetailedInfo[]),action.payload]}
            
        default:
            return state;
    }
};
