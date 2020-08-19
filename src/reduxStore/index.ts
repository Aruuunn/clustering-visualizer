import { createStore, applyMiddleware, Store } from 'redux'
import { persistStore, Persistor } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers'

export * from './reducers';
export * from './types';


export default ():{store:Store,persistor:Persistor} => {
    const store = createStore(rootReducer,composeWithDevTools(
      applyMiddleware(),
    ))
    const persistor = persistStore(store)
    return { store, persistor };
  }