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
    froze: boolean;
    maxId: number;
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
    froze: false,
    maxId: 0,
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
            return { ...state, start: true, froze: false };
        case GlobalActionTypes.END_VISUALIZATION:
            return { ...state, start: false, froze: false };

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
        case GlobalActionTypes.SET_FREEZE_STATUS:
            return { ...state, froze: action.payload as boolean };

        case GlobalActionTypes.DELETE_NODE:
            return {
                ...state,
                coordinatesOfNodes: state.coordinatesOfNodes.filter((o) => o.id !== (action.payload as number)),
            };
        case GlobalActionTypes.INCREMENT_MAX_ID: {
            return { ...state, maxId: state.maxId + 1 };
        }

        case GlobalActionTypes.INCREASE_MAX_ID:
            return { ...state, maxId: state.maxId + (action.payload as number) || 0 };

        default:
            return state;
    }
};
