import UserPreferencesActionTypes from '../types/UserPreferences.types';

export interface UserPreferencesState {
    sizeOfPoint: number;
    coordinatesOfFab?: number[];
    tutorialComplete: boolean;
    createClusterModeInfoComplete: boolean;
}

const initialState: UserPreferencesState = {
    sizeOfPoint: 9,
    tutorialComplete: false,
    createClusterModeInfoComplete: false,
};

interface Action {
    type: UserPreferencesActionTypes;
    payload?: any;
}

export default (state: UserPreferencesState = initialState, action: Action): UserPreferencesState => {
    switch (action.type) {
        case UserPreferencesActionTypes.FINISH_TUTORIAL:
            return { ...state, tutorialComplete: true };
        case UserPreferencesActionTypes.SET_SIZE_OF_POINT:
            return { ...state, sizeOfPoint: action.payload };
        case UserPreferencesActionTypes.SET_FAB_COORDINATES:
            return { ...state, coordinatesOfFab: action.payload as number[] };
        case UserPreferencesActionTypes.RESET_FAB_COORDINATES:
            return { ...state, coordinatesOfFab: undefined };
        case UserPreferencesActionTypes.SHOWED_CREATE_CLUSTER_MODE:
            return { ...state, createClusterModeInfoComplete: true };
        default:
            return state;
    }
};
