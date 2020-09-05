import GlobalActionTypes from '../types/Global.types';
import { AlgorithmNames } from '../../common/algorithms.enum';
import { Speed } from '../../common/speed.enum';

export interface Node {
    id: number;
    coordinates: number[];
}

export interface GlobalState {
    algorithm: AlgorithmNames | null;
    start: boolean;
    speed: Speed;
    coordinatesOfNodes: Node[];
    fabOpen: boolean;
    logs: string[];
}

interface Action {
    type: GlobalActionTypes;
    payload?: any;
}

const initialState: GlobalState = {
    algorithm: null,
    start: false,
    speed: Speed.faster,
    coordinatesOfNodes: [],
    fabOpen: true,
    logs: [],
};

export default (state: GlobalState = initialState, action: Action): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.SET_ALGORITHM:
            return { ...state, algorithm: action.payload };

        case GlobalActionTypes.SET_COORDINATES_OF_NODES:
            return { ...state, coordinatesOfNodes: action.payload };

        case GlobalActionTypes.RESET:
            return initialState;

        case GlobalActionTypes.START_VISUALIZATION:
            if (state.coordinatesOfNodes.length === 0 || state.start) {
                return state;
            }
            return { ...state, start: true };
        case GlobalActionTypes.END_VISUALIZATION:
            return { ...state, start: false };

        case GlobalActionTypes.SET_SPEED:
            return { ...state, speed: action.payload };

        case GlobalActionTypes.UPDATE_COORDINATES:
            const { id, coordinates } = action.payload;
            return {
                ...state,
                coordinatesOfNodes: state.coordinatesOfNodes.map((o) => {
                    if (o.id === id) {
                        return { id, coordinates };
                    } else return o;
                }),
            };
        case GlobalActionTypes.SET_OPEN_FAB:
            return { ...state, fabOpen: action.payload as boolean };

        case GlobalActionTypes.ADD_LOG:
            return { ...state, logs: [action.payload as string,...state.logs] };
        case GlobalActionTypes.CLEAR_LOGS:
            return { ...state, logs: [] };

        case GlobalActionTypes.SET_LOGS:
            return { ...state, logs: action.payload as string[] };


        default:
            return state;
    }
};
