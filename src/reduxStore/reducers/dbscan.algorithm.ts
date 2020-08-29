import { ReactElement } from 'react';
import DBSCANAlgorithmActionTypes from '../types/dbscan.types';
import AlgorithmActionTypes from '../types/algorithm.types';

export interface DBSCANState {
    minPts: number;
    eps: number;
    render: ReactElement[];
}

export interface DBSACNAction {
    type: DBSCANAlgorithmActionTypes | AlgorithmActionTypes;
    payload?: ReactElement | number | ReactElement[];
}

const initialState: DBSCANState = {
    minPts: 2,
    eps: 35,
    render: [],
};

export default (state: DBSCANState = initialState, action: DBSACNAction): DBSCANState => {
    switch (action.type) {
        case DBSCANAlgorithmActionTypes.SET_EPSILON:
            return { ...state, eps: action.payload as number };

        case DBSCANAlgorithmActionTypes.SET_MIN_POINTS:
            return { ...state, minPts: action.payload as number };

        case DBSCANAlgorithmActionTypes.SET_RENDER:
            return { ...state, render: action.payload as ReactElement[] };

        case DBSCANAlgorithmActionTypes.POP_RENDER:
            const temp = [...state.render];
            if (temp.length !== 0) {
                temp.pop();
            }
            return { ...state, render: [...temp] };

        case DBSCANAlgorithmActionTypes.ADD_TO_RENDER:
            return { ...state, render: [...state.render, action.payload as ReactElement] };

        case AlgorithmActionTypes.RESET_DATA:
            return { ...state, render: [] };
        default:
            return state;
    }
};
