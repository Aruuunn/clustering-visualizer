import { ReactElement } from 'react';
import { AlgorithmActionTypes, MeanShiftActionTypes } from '../types';

export interface MeanShiftState {
    windowSize: number;
    showGuideCircle: boolean;
}

export interface MeanShiftAction {
    payload?: number | ReactElement | ReactElement[] | boolean;
    type: MeanShiftActionTypes | AlgorithmActionTypes;
}

const initialState: MeanShiftState = {
    windowSize: 120,
    showGuideCircle: false,
};

export default (state: MeanShiftState = initialState, action: MeanShiftAction): MeanShiftState => {
    switch (action.type) {
        case MeanShiftActionTypes.SET_WINDOW_SIZE:
            return { ...state, windowSize: action.payload as number };

        case MeanShiftActionTypes.SET_SHOW_GUIDE_CIRCLE:
            return { ...state, showGuideCircle: action.payload as boolean };
        default:
            return state;
    }
};
