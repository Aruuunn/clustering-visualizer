import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "../components/NavBar";
import Board from "../components/Board";
import theme from "../Themes/DarkTheme";
import initStore from "../store";
import "./index.css";

const { store, persistor } = initStore();


export default function index() {
  return (
    <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading..."} persistor={persistor}>
        <ThemeProvider theme={theme}>
        <div style={{height:'100vh',overflow:'hidden'}}>
      <NavBar />
      <Board />

    </div>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>

  )
}

