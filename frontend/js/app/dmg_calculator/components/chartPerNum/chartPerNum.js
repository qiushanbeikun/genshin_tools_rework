import * as React from 'react';
import { ErrorMessage, FormikProvider, useFormik, useFormikContext } from 'formik';
import { Box, Typography } from '@mui/material';
import ChartSettings from './chartSettings';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import * as Yup from 'yup';
import { Line } from 'react-chartjs-2';
import useAsyncEffect from 'use-async-effect';
import { generateChartContext } from './chart_utils/generateChartContext';
import { chartEntryValidation } from './chart_utils/utils';
import { DEFAULT_BOUNDARY, DEFAULT_SETTINGS } from '../constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// todo validation is not working at this moment
const validation = Yup.object().shape({
  boundary: Yup.number('Must be number')
    .integer('Must be integer')
    .positive('Must be positive')
    .required(),
});

export default function ChartPerNum() {
  const { values } = useFormikContext();

  const formik = useFormik({
    initialValues: {
      fields: DEFAULT_SETTINGS,
      boundary: DEFAULT_BOUNDARY,
      baseChart: null,
      prevChart: null,
    },
    validationSchema: validation,
  });

  useAsyncEffect(async () => {
    if (!chartEntryValidation(values, formik.values)) {
      alert('Please check inputs.');
      return;
    }
    const baseChart = await generateChartContext(
      values,
      formik.values.fields,
      formik.values.boundary,
      'base'
    );

    const prevChart = await generateChartContext(
      values,
      formik.values.fields,
      formik.values.boundary,
      'prev'
    );

    await formik.setFieldValue('baseChart', baseChart);
    await formik.setFieldValue('prevChart', prevChart);
  }, [formik.values.fields, formik.values.boundary, values]);

  return (
    <>
      <Box sx={{ m: '1em 0' }}>
        <Typography variant="h5">Marginal Utilization</Typography>
      </Box>
      <FormikProvider value={formik}>
        <Box sx={{ m: '1em 0' }}>
          <ErrorMessage name="boundary" />
          {/* todo: in next sprint, make all fields of PanelInput are configurable. */}
          <ChartSettings fields={formik.values.fields} />
        </Box>

        {formik.values.baseChart && (
          <Line
            datasetIdKey="id"
            options={formik.values.baseChart.options}
            data={formik.values.baseChart.data}
            type="line"
          />
        )}

        {formik.values.prevChart && (
          <Line
            datasetIdKey="id"
            options={formik.values.prevChart.options}
            data={formik.values.prevChart.data}
            type="line"
          />
        )}
      </FormikProvider>
    </>
  );
}
