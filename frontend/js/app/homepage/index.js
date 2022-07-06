import { Box, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import * as React from 'react';
import { GenshinStyles } from '../../theme';
import { HOME_PAGE_DOC } from './components/constants';
import { Content } from './components/content';
import { Desc } from './components/desc';

const PageHeightContainer = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
`;

export default function Homepage() {
  const classes = GenshinStyles();
  return (
    <Box maxWidth="md" sx={{ m: '0 auto' }}>
      <PageHeightContainer>
        <div>
          <Typography variant="h3" className={classes.root}>
            Genshin Impact Tools &#x3B1;
          </Typography>

          <Desc />
        </div>
      </PageHeightContainer>

      {/*<PageHeightContainer>*/}
      {/*  <Grid container spacing={1}>*/}
      {/*    {HOME_PAGE_DOC.map((props) => {*/}
      {/*      return (*/}
      {/*        <Content {...props} />*/}
      {/*      )*/}
      {/*    })}*/}
      {/*  </Grid>*/}
      {/*</PageHeightContainer>*/}
    </Box>
  );
}
