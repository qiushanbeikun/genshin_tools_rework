import React from 'react';
import {hot} from 'react-hot-loader/root';
import {Provider} from 'react-redux';
import store, {persist} from './store/index'
import Home from './pages/Home';

import SentryBoundary from './utils/SentryBoundary';
import "./localization/i18n"
import {PersistGate} from "redux-persist/integration/react";
import {Router} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import MyRoutes from "./routes";
import ButtonAppBar from "./app/Navbar/index";
export function App() {

  const theme = createTheme();


  return (
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ButtonAppBar/>
            <MyRoutes/>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

// <SentryBoundary>


// </SentryBoundary>


export default hot(App);
