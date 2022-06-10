import React from 'react';
import {BrowserRouter} from "react-router-dom";
import styled from "@emotion/styled";
import Navbar from '../app/Navbar/index';
import MyRoutes from "../routes";
import {ThemeProvider, createTheme} from "@mui/material";

const AppContainer = styled.div``;

const theme = createTheme();

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContainer>
          <Navbar/>
          <MyRoutes/>
        </AppContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Home;
