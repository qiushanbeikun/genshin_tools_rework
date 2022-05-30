import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import * as React from "react";


const styledTitle = () => styled(Typography)``;

const HomePageContainer = styled.div`
  text-align: center;
`;


export default function Homepage() {
  return (
    <HomePageContainer>
      <Typography variant="h2">Genshin Impact Tools</Typography>
      <Typography>123132</Typography>
    </HomePageContainer>
  )
}
