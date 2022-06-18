import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { Fragment } from 'react';
import { INDEX_TO_NAME_POSITION } from './constants';

export default function PositionInput({ index, target }) {
  const {
    values: { names, descs },
    handleChange,
  } = useFormikContext();

  return (
    <Fragment key={index}>
      <Grid item xs={3}>
        {INDEX_TO_NAME_POSITION[index]} {target}
      </Grid>
      <Grid item xs={8}>
        {target === 'name' ? (
          <TextField
            name={`names[${index}]`}
            value={names[index]}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
        ) : (
          <TextField
            name={`descs[${index}]`}
            value={descs[index]}
            onChange={handleChange}
            variant="standard"
            fullWidth
            multiline
            rows={2}
          />
        )}
      </Grid>
    </Fragment>
  );
}
