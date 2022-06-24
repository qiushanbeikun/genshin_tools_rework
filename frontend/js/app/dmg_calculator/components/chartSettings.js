import { ErrorMessage, useFormikContext } from 'formik';
import { Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { Fragment } from 'react';

export default function ChartSettings() {
  const { values, setFieldValue, handleChange } = useFormikContext();

  const handleFieldChange = (value, field_name) => {
    console.log(value, field_name);
    const copy = [...values.fields];
    copy.find((f) => f.name === field_name).step = value;
    setFieldValue('fields', copy);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <Typography>Boundary</Typography>
      </Grid>
      <Grid item xs={10}>
        <TextField
          type="number"
          name="boundary"
          onChange={handleChange}
          variant="standard"
          required
          value={values.boundary}
        />
        <ErrorMessage name="boundary" />
      </Grid>

      {values.fields.map((field) => (
        <Fragment key={field.name}>
          <Grid item xs={2}>
            <Typography>{field.value}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              value={field.step}
              variant="standard"
              required
              onChange={(e) => handleFieldChange(e.target.value, field.name)}
            />
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
}
