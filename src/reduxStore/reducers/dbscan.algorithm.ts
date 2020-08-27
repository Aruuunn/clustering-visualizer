import DBSCANAlgorithmActionTypes from '../types/dbscan.types';

export interface DBSCANState {
    minPts: null | number;
    eps: null | number;
}

export interface DBSACNAction {
    type: DBSCANAlgorithmActionTypes;
    payload?: any;
}

const initialState: DBSCANState = {
    minPts: null,
    eps: null,
};

export default (state: DBSCANState = initialState, action: DBSACNAction): DBSCANState => {
    switch (action.type) {
        default:
            return state;
    }
};
