import { ReactElement } from 'react';
import DBSCANAlgorithmActionTypes from '../types/dbscan.types';
import AlgorithmActionTypes from '../types/algorithm.types';

export interface DBSCANState {
    minPts: number;
    eps: number;
    showGuideCircle: boolean;
}

export interface DBSACNAction {
    type: DBSCANAlgorithmActionTypes | AlgorithmActionTypes;
    payload?: ReactElement | number | ReactElement[] | boolean;
}

const initialState: DBSCANState = {
    minPts: 2,
    eps: 35,
    showGuideCircle: false,
};

export default (state: DBSCANState = initialState, action: DBSACNAction): DBSCANState => {
    switch (action.type) {
        case DBSCANAlgorithmActionTypes.SET_EPSILON:
            return { ...state, eps: action.payload as number };

        case DBSCANAlgorithmActionTypes.SET_MIN_POINTS:
            return { ...state, minPts: action.payload as number };

        case DBSCANAlgorithmActionTypes.SET_SHOW_GUIDE_CIRCLE:
            return { ...state, showGuideCircle: action.payload as boolean };

        default:
            return state;
    }
};
