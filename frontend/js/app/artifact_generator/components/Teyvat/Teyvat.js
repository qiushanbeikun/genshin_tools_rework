import * as React from 'react';
import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import { GenshinStyles } from '../../../../theme';
import { ARTIFACT_POSITIONS, INITIAL_ARTI_CONFIG } from './constants';
import { getParsedArtiConfig, upperCase } from './utils';
import background from '../../../../../assets/images/artifact_generator/erased_template.png';
import { SImg } from '../../styles';
import { useTranslation } from 'react-i18next';
import { FormikProvider, useFormik } from 'formik';
import { MainPropSelect } from './mainPropSelect';
import { VicePropRow } from './vicePropRow';
import axios from 'axios';
import BtnGroup from '../btnGroup';
import qs from 'query-string';
import useAsyncEffect from 'use-async-effect';
import { axiosService } from '../../../../utils/axios';

export default function Teyvat() {
  const classes = GenshinStyles();
  const { t, i18n } = useTranslation('generator_ui');
  const [setNames, setSetNames] = useState([]);
  const [artifact, setArtifact] = useState();
  const language = i18n.language;

  const handleSubmit = async (values) => {
    const selectedSetName = setNames[values.artiSet];
    const artiConfig = getParsedArtiConfig(values, selectedSetName);
    const { data } = await axios.post('/artifact_generator/teyvat/', artiConfig);
    setArtifact(data.data);
  };

  const formik = useFormik({
    initialValues: INITIAL_ARTI_CONFIG,
    onSubmit: handleSubmit,
  });

  useAsyncEffect(async () => {
    const { data } = await axiosService.get(
      `/artifact_generator/get_set_names/?${qs.stringify({ lang: language })}`
    );
    setSetNames(data);
  }, []);

  return (
    <FormikProvider value={formik}>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={7}>
          <h4>{t('editor')}</h4>
          <form onSubmit={formik.handleSubmit}>
            <FormControl component="fieldset" sx={{ m: 1, width: '80%' }}>
              <FormLabel component="legend" className={classes.root}>
                {t('artifact_position')}
              </FormLabel>
              <RadioGroup
                row
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
              >
                {ARTIFACT_POSITIONS.map((pos) => (
                  <FormControlLabel
                    value={pos}
                    control={<Radio />}
                    className={classes.root}
                    label={upperCase(pos)}
                    key={pos}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ m: 1, width: '80%' }}>
              <InputLabel>Artifact Set</InputLabel>
              <Select value={formik.values.artiSet} onChange={formik.handleChange} name="artiSet">
                {setNames.length !== 0 &&
                  setNames.map((each, index) => (
                    <MenuItem key={each} value={index}>
                      {each}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <MainPropSelect name="main_prop" />

            <Grid container spacing={1}>
              {[0, 1, 2, 3].map((index) => (
                <VicePropRow index={index} />
              ))}
            </Grid>

            <BtnGroup func={formik.handleReset} />
          </form>
        </Grid>

        <Grid item xs={5}>
          <h4>{t('artifact_screenshot')}</h4>
          {!!artifact ? (
            <SImg src={`data:image/png;base64,${artifact}`} />
          ) : (
            <SImg src={background} />
          )}
        </Grid>
      </Grid>
    </FormikProvider>
  );
}
