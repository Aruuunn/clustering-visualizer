import UserPreferencesActionTypes from '../types/UserPreferences.types';

export interface UserPreferencesState {
    sizeOfPoint: number;
}

const initialState: UserPreferencesState = {
    sizeOfPoint: 9,
};

interface Action {
    type: UserPreferencesActionTypes;
    payload?: any;
}

export default (state: UserPreferencesState = initialState, action: Action): UserPreferencesState => {
    switch (action.type) {
        case UserPreferencesActionTypes.FINISH_TUTORIAL:
            return state;
        case UserPreferencesActionTypes.SET_SIZE_OF_POINT:
            return { ...state, sizeOfPoint: action.payload };
        default:
            return state;
    }
};
