import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';


export default () => {
    let store = createStore(rootReducer,composeWithDevTools(
      applyMiddleware(),
    ))
    let persistor = persistStore(store)
    return { store, persistor };
  }