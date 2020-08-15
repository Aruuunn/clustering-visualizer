import UserDataActionTypes from "../types/userData.types";

interface State {
   sizeOfPoint:number;
}

const initialState :State = {
    sizeOfPoint:9
}

interface Action {
    type: UserDataActionTypes;
    payload?:any;
}

export default (state:State=initialState ,action:Action) => {
    switch(action.type){
        case UserDataActionTypes.FINISH_TUTORIAL:
            return state;
        case UserDataActionTypes.SET_SIZE_OF_POINT:
            return {...state,sizeOfPoint:action.payload}
        default:return state;
    }
};