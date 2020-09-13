import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import theme from './themes/DarkTheme';
import initStore from './reduxStore';
import './index.css';

export const { store, persistor } = initStore();

ReactDOM.render(
    <React.StrictMode>
        {' '}
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={'loading...'} persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        <StylesProvider injectFirst>
                            <App />
                        </StylesProvider>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

serviceWorker.register();
