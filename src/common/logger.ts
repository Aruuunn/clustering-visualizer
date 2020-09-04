import { store } from '../index';
import { GlobalActionTypes } from '../reduxStore';

export class Logger {
    static add = (data: string) => {
        store.dispatch({ type: GlobalActionTypes.ADD_LOG, payload: data });
    };
    static setLogs = (data: string[]) => store.dispatch({ type: GlobalActionTypes.SET_LOGS, payload: data });

    static clear = () => {
        store.dispatch({ type: GlobalActionTypes.CLEAR_LOGS });
    };
}

export default Logger;
