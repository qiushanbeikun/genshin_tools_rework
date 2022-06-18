import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import * as React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { profileValidation } from './validations';
import { Box, Button, Grid, TextField } from '@mui/material';
import Copyright from './copyright';
import { axiosService, fetcher } from '../../../utils/axios';
import useSWR from 'swr';
import store from '../../../store';
import authSlice from '../../../store/slices/auth';

const handleUpdate = (values) => {
  const payload = {
    id: values.id,
    username: values.username,
  };
  if (!!values.genshin_server) {
    payload['genshin_server'] = values.genshin_server;
  }
  if (!!values.genshin_uid) {
    payload['genshin_uid'] = values.genshin_uid;
  }

  axiosService.post(`/api/auth/update/`, values).then((res) => {
    store.dispatch(authSlice.actions.setAccount(res.data));
  });
};

export default function Profile() {
  const auth = useSelector((state: RootState) => state.auth);
  const formik = useFormik({
    initialValues: {
      id: auth.account.id,
      email: auth.account.email,
      username: auth.account.username,
      genshin_server: auth.account.genshin_server,
      genshin_uid: auth.account.genshin_uid,
    },
    onSubmit: handleUpdate,
    validationSchema: profileValidation,
  });

  return (
    <Box maxWidth="lg" sx={{ m: '0 auto', height: 'calc(100vh - 64px)' }}>
      <Grid container spacing={4} sx={{ m: '2em 0' }}>
        <Grid item xs={3}>
          <h3>User Profile</h3>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="username"
                type="text"
                variant="outlined"
                margin="normal"
                label="Username"
                fullWidth
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <ErrorMessage name="username" />
              <TextField
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                label="Email"
                fullWidth
                disabled
                value={formik.values.email}
              />
              <TextField
                name="genshin_server"
                variant="outlined"
                margin="normal"
                label="Genshin Server"
                fullWidth
                value={formik.values.genshin_server}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <TextField
                name="genshin_uid"
                variant="outlined"
                margin="normal"
                label="Genshin UID"
                fullWidth
                value={formik.values.genshin_uid}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ my: 1 }}>
                Update
              </Button>

              <Button fullWidth variant="contained" color="warning" sx={{ my: 1 }} disabled>
                Change PW (WIP)
              </Button>
            </form>
          </FormikProvider>
        </Grid>

        <Grid item xs={9}>
          <h3>Recent Activities (WIP)</h3>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Box>
  );
}
