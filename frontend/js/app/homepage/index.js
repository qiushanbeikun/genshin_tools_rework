import {Box, Grid, Typography} from "@mui/material";
import styled from "@emotion/styled";
import * as React from "react";
import {GenshinStyles} from "../../theme";
import {HOME_PAGE_DOC} from "./components/constants";
import {Content} from "./components/content";

const PageHeightContainer = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  scroll-snap-type: y mandatory;
`;

const HomeWrapper = styled(Box)`
  display: block;
  margin: 2em auto;
`;

export default function Homepage() {
  const classes = GenshinStyles()
  return (
    <HomeWrapper maxWidth="md">
      <PageHeightContainer>
        <div>
          <Typography variant="h3" className={classes.root}>Genshin Impact Tools</Typography>
          <a href="http://www.qiushanbeikun.com" target="_blank" rel="noopener noreferrer">
            <Typography className={classes.root}>By QiushanBeikun</Typography>
          </a>
        </div>
      </PageHeightContainer>

      <PageHeightContainer>
        <Grid container spacing={1}>
          {HOME_PAGE_DOC.map((props) => {
            return (
              <Content {...props} />
            )
          })}
        </Grid>
      </PageHeightContainer>
    </HomeWrapper>
  )
}
