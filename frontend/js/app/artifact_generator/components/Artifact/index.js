import * as React from 'react';
import { useFormik } from 'formik';
import { Box, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import ArtifactList from './components/artifactList';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { axiosService } from '../../../../utils/axios';
import useAsyncEffect from 'use-async-effect';

const StyleBanner = styled.div`
  vertical-align: center;
  text-align: center;
  margin: 1em;
  padding: 1em;
  border: 1px solid #c3ccce;
  color: #4db2d4;
  background-color: #dff1f1;
  border-radius: 10px;
`;

export default function Artifact() {
  const auth = useSelector((state: RootState) => state.auth);

  if (!!!auth.token) {
    return (
      <Box maxWidth="lg" sx={{ m: '3em auto', textAlign: 'center' }}>
        <Typography variant="h5">You need to login to use features in this page.</Typography>
      </Box>
    );
  }

  const formik = useFormik({
    initialValues: {
      total_active_artifacts: 0,
      total_uploads: 0,
      total_contributors: 0,
    },
  });

  useAsyncEffect(async () => {
    const { data } = await axiosService.get('/artifact_generator/get_artifact_summary/');
    await formik.setFieldValue('total_active_artifacts', data.total_active_artifacts);
    await formik.setFieldValue('total_uploads', data.total_uploads);
    await formik.setFieldValue('total_contributors', data.total_contributors);
  }, []);

  // useSWR('/artifact_generator/get_artifact_summary/', {
  //   fetcher: async (url) => {
  //     try {
  //       return await axiosService.get(url);
  //     } catch (e) {
  //       console.error(e, 'Failed but dont care');
  //     }
  //   },
  //   onSuccess: (r) => {
  //     formik.setFieldValue('total_active_artifacts', r.data.total_active_artifacts);
  //     formik.setFieldValue('total_uploads', r.data.total_uploads);
  //     formik.setFieldValue('total_contributors', r.data.total_contributors);
  //   },
  // });

  return (
    <>
      <Box maxWidth="lg" sx={{ m: '1em auto' }}>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <StyleBanner>
                <Typography> Total Active Artifacts</Typography>
                <Typography variant="h4">{formik.values.total_active_artifacts}</Typography>
              </StyleBanner>
            </Grid>
            <Grid item xs={4}>
              <StyleBanner>
                <Typography> Total Artifact Uploads</Typography>
                <Typography variant="h4">{formik.values.total_uploads}</Typography>
              </StyleBanner>
            </Grid>
            <Grid item xs={4}>
              <StyleBanner>
                <Typography> Total Contributors</Typography>
                <Typography variant="h4">{formik.values.total_contributors}</Typography>
              </StyleBanner>
            </Grid>
          </Grid>
        </div>

        <ArtifactList />
      </Box>
    </>
  );
}
