import React from 'react';
import {BrowserRouter} from "react-router-dom";
import styled from "@emotion/styled";
import Navbar from '../app/Navbar/index';
import MyRoutes from "../routes";
const AppContainer = styled.div``;

const Home = () => {
  return (
    <>
      <BrowserRouter>
        <AppContainer>
          <Navbar/>
          <MyRoutes/>
        </AppContainer>
      </BrowserRouter>
    </>
  );
};

export default Home;
