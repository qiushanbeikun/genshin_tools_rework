import React from 'react';
import styled from "@emotion/styled";
import Navbar from '../app/Navbar/index';
import MyRoutes from "../routes/routes";
import {ThemeProvider, createTheme} from "@mui/material";
import {BrowserRouter} from "react-router-dom";

const AppContainer = styled.div``;

const theme = createTheme();

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
        <AppContainer>
          <Navbar/>
          <MyRoutes/>
        </AppContainer>
    </ThemeProvider>
  );
};

export default Home;
