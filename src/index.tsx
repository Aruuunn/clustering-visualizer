import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import theme from './themes/DarkTheme';
import initStore from './reduxStore';
import './index.css';

const { store, persistor } = initStore();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={'loading...'} persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
