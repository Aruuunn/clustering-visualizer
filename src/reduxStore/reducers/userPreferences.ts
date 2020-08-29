import UserPreferencesActionTypes from '../types/UserPreferences.types';

export interface UserPreferencesState {
    sizeOfPoint: number;
    coordinatesOfFab?: number[];
    tutorialComplete: boolean;
}

const initialState: UserPreferencesState = {
    sizeOfPoint: 9,
    tutorialComplete: false,
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
        default:
            return state;
    }
};
