import { Box, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import * as React from 'react';
import { GenshinStyles } from '../../theme';
import { HOME_PAGE_DOC } from './components/constants';
import { Content } from './components/content';

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
            Genshin Impact Tools &#x3B1;-&#x3B1;
          </Typography>
          <a href="http://www.qiushanbeikun.com" target="_blank" rel="noopener noreferrer">
            <Typography className={classes.root}>By QiushanBeikun</Typography>
          </a>
          <div>
            <Typography>
              {'This site is a fun site of '}
              <a href="https://ys.mihoyo.com/" target="_blank">
                Genshin Impact
              </a>
              {'. All associated names and images are property of '}
              <a href="https://www.mihoyo.com/" target="_blank">
                Mihoyo(China)
              </a>
              {' or '}
              <a href="https://www.hoyoverse.com/" target="_blank">
                HoyoVerse
              </a>
              .
            </Typography>
          </div>
          <br />
          <Typography>
            For any fair please contact <a href="mailto:beikuncanada@gmail.com">author</a> or join
            the QQ group (TBA).
          </Typography>
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
