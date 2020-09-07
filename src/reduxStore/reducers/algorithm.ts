import AlgorithmActionTypes from '../types/algorithm.types';
import { ReactElement } from 'react';

export interface AlgorithmState {
    render: ReactElement[];
}

export interface AlgorithmAction {
    payload?: any;
    type: AlgorithmActionTypes;
}

const initialState: AlgorithmState = {
    render: [],
};

export default (state: AlgorithmState=initialState, action: AlgorithmAction): AlgorithmState => {
    switch (action.type) {
        case AlgorithmActionTypes.ADD_TO_RENDER:
            return { ...state, render: [...state.render, action.payload as ReactElement] };

        case AlgorithmActionTypes.APPEND_TO_RENDER:
            return { ...state, render: [...state.render, ...(action.payload as ReactElement[])] };

        case AlgorithmActionTypes.POP_RENDER:
            const render = [...state.render];
            render.pop();
            return { ...state, render };

        case AlgorithmActionTypes.RESET_DATA:
            return initialState;

        case AlgorithmActionTypes.SET_RENDER:
            return { ...state, render: action.payload as ReactElement[] };
            
        default:
            return state;
    }
};
