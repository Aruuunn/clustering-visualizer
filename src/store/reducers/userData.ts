import UserDataActionTypes from "../types/userData.types";

interface State {

}

interface Action {
    type: UserDataActionTypes;
    payload?:any;
}

export default (state:State= {},action:Action) => {
    switch(action.type){
        case UserDataActionTypes.FINISH_TUTORIAL:
            return state;
        default:return state;
    }
}