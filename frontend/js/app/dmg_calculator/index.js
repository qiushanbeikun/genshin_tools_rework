import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import Panel from './components/panel';
import ChartPerNum from './components/chartPerNum';
import { INITIAL_PANEL } from './components/constants';

export default function DmgCalculator() {
  const formik = useFormik({
    initialValues: INITIAL_PANEL,
  });

  return (
    <Box maxWidth="lg" sx={{ m: '1em auto' }}>
      <FormikProvider value={formik}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Typography variant="h5">当前面板</Typography>
            <Box sx={{ m: '1em 0' }}>
              <Panel />
            </Box>
          </Grid>

          <Grid item xs={7}>
            <Typography variant="h5">Marginal Utilization</Typography>
            <ChartPerNum />
          </Grid>
        </Grid>
      </FormikProvider>
    </Box>
  );
}
