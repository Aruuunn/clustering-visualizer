import { createStore } from 'redux'

import rootReducer from './reducers'
import { persistStore } from 'redux-persist'


export default () => {
    let store = createStore(rootReducer)
    let persistor = persistStore(store)
    return { store, persistor };
  }