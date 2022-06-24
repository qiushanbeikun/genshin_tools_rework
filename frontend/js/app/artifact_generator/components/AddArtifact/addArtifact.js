import * as React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { INITIAL_FORM_VALUE } from './constants';
import PositionInput from './positionInput';
import { useNavigate, useParams } from 'react-router-dom';
import Desc from './desc';
import qs from 'query-string';
import { axiosService } from '../../../../utils/axios';
import useAsyncEffect from 'use-async-effect';

export default function AddArtifact() {
  const { t, i18n } = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const language = i18n.language;

  const headers = {
    Authorization: auth.token ? `Bearer ${auth.token}` : null,
  };

  const handleSubmit = async (values, language) => {
    const payload = { ...values };
    payload.contributor = auth.account.email;
    payload.language = language;
    const { data } = await axiosService.post('/artifact_generator/add_artifact/', payload);
    refreshArti(data);
  };

  /**
   *
   * @param id
   * @param publish Note this publish here is the target state, if want to make release arti, it should be true
   */
  const handlePublish = async (id, publish) => {
    const { data } = await axiosService.post(`/artifact_generator/publish/`, {
      id: id,
      production: publish,
    });
    formik.setFieldValue('production', data.production);
  };

  const handleDelete = async (id) => {
    alert('double check to delete');
    await axiosService.delete(`/artifact_generator/delete/${id}`, { headers: headers });
    navigate('/artifact_generator');
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUE,
    onSubmit: (values) => handleSubmit(values, language),
  });

  const refreshArti = (data) => {
    formik.setFieldValue('id', data.id);
    formik.setFieldValue('title', data.title);
    formik.setFieldValue('names', [data.flower, data.feather, data.sand, data.goblet, data.head]);
    formik.setFieldValue('img_path', data.img_path);
    formik.setFieldValue('two_set_buff', data.two_set_buff);
    formik.setFieldValue('four_set_buff', data.four_set_buff);
    formik.setFieldValue('descs', [
      data.flower_desc,
      data.feather_desc,
      data.sand_desc,
      data.goblet_desc,
      data.head_desc,
    ]);
    formik.setFieldValue('production', data.production);
  };

  useAsyncEffect(async () => {
    if (!!id) {
      const { data } = await axiosService.get(
        `/artifact_generator/artifact/?${qs.stringify({ id: id })}`
      );
      refreshArti(data);
    }
  }, []);

  return (
    <Box maxWidth="lg" sx={{ m: '1em auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4" paragraph>
                    Properties
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  Title
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={formik.values.title}
                    name="title"
                    onChange={formik.handleChange}
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                {[0, 1, 2, 3, 4].map((index) => (
                  <PositionInput index={index} target="name" key={`name_${index}`} />
                ))}
                {[0, 1, 2, 3, 4].map((index) => (
                  <PositionInput index={index} target="desc" key={`desc_${index}`} />
                ))}

                <Grid item xs={3}>
                  Image Path
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={formik.values.img_path}
                    name="img_path"
                    onChange={formik.handleChange}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3}>
                  2-Set Bonus
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={formik.values.two_set_buff}
                    name="two_set_buff"
                    onChange={formik.handleChange}
                    fullWidth
                    variant="standard"
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={3}>
                  4-Set Bonus
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={formik.values.four_set_buff}
                    name="four_set_buff"
                    onChange={formik.handleChange}
                    fullWidth
                    variant="standard"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>

              <Box sx={{ m: '1em', textAlign: 'center' }}>
                <Button variant="contained" type="submit" disabled={formik.values.production}>
                  {!!id ? 'Update Template' : 'Upload Template'}
                </Button>

                <Button variant="contained" color="error" onClick={() => formik.handleReset}>
                  {i18n.t('generator_ui:clear')}
                </Button>
                {auth.account.is_superuser && (
                  <>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handlePublish(formik.values.id, !formik.values.production)}
                    >
                      {formik.values.production ? 'Unpublished' : 'Publish'}
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(id)}>
                      Delete
                    </Button>
                  </>
                )}
              </Box>
            </form>
          </FormikProvider>
        </Grid>
        <Desc />
      </Grid>
    </Box>
  );
}
