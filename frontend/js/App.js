import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import store, { persist } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import MyRoutes from './routes/routes';
import ButtonAppBar from './app/Navbar/index';

export function App() {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ButtonAppBar />
            <MyRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default hot(App);
