import { MeanShiftActionTypes } from '../types';

export interface MeanShiftState {
    windowSize: number;
}

export interface MeanShiftAction {
    payload?: number;
    type: MeanShiftActionTypes;
}

const initialState: MeanShiftState = {
    windowSize: 35,
};

export default (state: MeanShiftState = initialState, action: MeanShiftAction): MeanShiftState => {
    switch (action.type) {
        case MeanShiftActionTypes.SET_WINDOW_SIZE:
            return { ...state, windowSize: action.payload as number };
        default:
            return state;
    }
};
