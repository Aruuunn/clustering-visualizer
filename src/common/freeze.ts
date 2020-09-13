import { store } from '../index';
import { RootState } from '../reduxStore';

const freeze = (resolve: any, reject: any) => {
    if ((store.getState() as RootState).global.froze === false) {
        resolve();
        return;
    }

    const timer = setInterval(() => {
        if ((store.getState() as RootState).global.froze === false) {
            clearInterval(timer);
            resolve();
        }
    }, 100);
};

export default freeze;
