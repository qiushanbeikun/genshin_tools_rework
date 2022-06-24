import * as React from 'react';
import { generateLabels, generatePanelList, panelsToDmgList, perNumChartData } from './utils';
import { ErrorMessage, FormikProvider, useFormik, useFormikContext } from 'formik';
import { Box, TextField, Typography } from '@mui/material';
import ChartSettings from './chartSettings';
import { useEffect } from 'react';

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
import { GRAPH_COLORS_PRESETS } from './constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// todo validation is not working at this moment
const validation = Yup.object().shape({
  boundary: Yup.number('not a number')
    .integer()
    .positive()
    .required(),
});

export default function ChartPerNum() {
  const { values } = useFormikContext();

  const formik = useFormik({
    initialValues: {
      fields: [
        { name: 'atk_percent', step: 6, value: 'ATK Percent' },
        { name: 'ctk_rate', step: 3.5, value: 'CTK Rate' },
        { name: 'ctk_dmg', step: 7, value: 'CTK DMG' },
        { name: 'ele_mastery', step: 16, value: 'Ele Mastery' },
      ],
      boundary: 3,
    },
    validationSchema: validation,
  });

  const labels = generateLabels(formik.values.boundary);

  const dataValues = formik.values.fields.map((field) =>
    perNumChartData(formik.values.boundary, field, values)
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'button',
      },
      title: {
        display: true,
        text: 'Damage Delta Expectation',
      },
    },
  };

  const data = {
    labels: labels,
    datasets: dataValues.map((value, index) => {
      return {
        id: index,
        label: formik.values.fields[index].name,
        fill: true,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value,
        borderColor: GRAPH_COLORS_PRESETS[index],
      };
    }),
  };

  return (
    <>
      <Typography variant="h5">Marginal Utilization</Typography>
      <FormikProvider value={formik}>
        <Box sx={{ m: '1em 0' }}>
          <ErrorMessage name="boundary" />
          {/*<Typography variant="h6">Settings</Typography>*/}
          {/* todo: in next sprint, make all fields of PanelInput are configurable. */}
          <ChartSettings fields={formik.values.fields} />
        </Box>
        {data && <Line datasetIdKey="id" options={options} data={data} type="line" />}
      </FormikProvider>
    </>
  );
}
