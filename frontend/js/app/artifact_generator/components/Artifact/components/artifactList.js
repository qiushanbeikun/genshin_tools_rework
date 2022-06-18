import * as React from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as qs from 'query-string';
import { Box, Grid, TextField } from '@mui/material';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../../store';
import { ArtiList } from './singleArtiList';
import { useIsMounted } from './debounceMount';
import { axiosService } from '../../../../../utils/axios';
import useAsyncEffect from 'use-async-effect';

export default function ArtifactList() {
  const isMounted = useIsMounted();
  const { t, i18n } = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);
  const language = i18n.language;

  const formik = useFormik({
    initialValues: {
      search_term: '',
      unpublished: [],
      published: [],
    },
  });

  useAsyncEffect(async () => {
    await listActiveArti();
    await handleSearch();
  }, []);

  useDebounce(
    async () => {
      if (!isMounted) {
        return;
      }
      await handleSearch(formik.values.search_term);
    },
    500,
    [formik.values.search_term]
  );

  const handleSearch = async () => {
    const { data } = await axiosService.get(
      `/artifact_generator/pending_artifact/?${qs.stringify({
        search_term: formik.values.search_term,
        lang: language,
      })}`
    );
    await formik.setFieldValue('unpublished', data);
  };

  const listActiveArti = async () => {
    const { data } = await axiosService.get(
      `/artifact_generator/active_artifact/?${qs.stringify({ lang: language })}`
    );
    await formik.setFieldValue('published', data);
  };

  return (
    <Box sx={{ m: '1em' }}>
      <FormikProvider value={formik}>
        <Box sx={{ my: '1em' }}>
          <TextField
            name="search_term"
            fullWidth
            value={formik.values.search_term}
            onChange={formik.handleChange}
            label="Search to update an existing template or create a new template."
          />
        </Box>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ m: '1em 0' }}>
              Artifact under review
            </Typography>
            <ArtiList target="unpublished" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ m: '1em 0' }}>
              Artifact templates in production
            </Typography>
            <ArtiList target="published" />
          </Grid>
        </Grid>
        <br />
      </FormikProvider>
    </Box>
  );
}
