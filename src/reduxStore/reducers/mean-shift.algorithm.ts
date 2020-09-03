import { ReactElement } from 'react';
import { AlgorithmActionTypes, MeanShiftActionTypes } from '../types';

export interface MeanShiftState {
    windowSize: number;
    render: ReactElement[];
    showGuideCircle: boolean;
}

export interface MeanShiftAction {
    payload?: number | ReactElement | ReactElement[] | boolean;
    type: MeanShiftActionTypes | AlgorithmActionTypes;
}

const initialState: MeanShiftState = {
    windowSize: 120,
    render: [],
    showGuideCircle: false,
};

export default (state: MeanShiftState = initialState, action: MeanShiftAction): MeanShiftState => {
    switch (action.type) {
        case MeanShiftActionTypes.SET_WINDOW_SIZE:
            return { ...state, windowSize: action.payload as number };
        case MeanShiftActionTypes.ADD_TO_RENDER:
            return { ...state, render: [...state.render, action.payload as ReactElement] };
        case MeanShiftActionTypes.SET_RENDER:
            return { ...state, render: action.payload as ReactElement[] };
        case AlgorithmActionTypes.RESET_DATA:
            return { ...state, render: [] };
        case MeanShiftActionTypes.SET_SHOW_GUIDE_CIRCLE:
            return { ...state, showGuideCircle: action.payload as boolean };
        default:
            return state;
    }
};
