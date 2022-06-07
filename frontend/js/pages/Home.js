import React from 'react';
import {BrowserRouter} from "react-router-dom";
import styled from "@emotion/styled";
import Navbar from '../app/Navbar/index';
import MyRoutes from "../routes";
import {useTranslation} from "react-i18next";
const AppContainer = styled.div``;

const RoutesWrapper = styled(MyRoutes)`
  position: relative;
  top: 3em;
  padding: 10em;
`;

const Home = () => {
  return (
    <>
      <BrowserRouter>
        <AppContainer>
          <Navbar/>
          <RoutesWrapper>
            <MyRoutes/>
          </RoutesWrapper>
        </AppContainer>
      </BrowserRouter>
    </>
  );
};

export default Home;
