import { useFormikContext } from 'formik';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';

export default function Panel() {
  const { values, handleChange } = useFormikContext();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography>Life</Typography>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="life"
            value={values.life}
            onChange={handleChange}
            variant="standard"
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>Base ATK</Typography>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="base_atk"
            value={values.base_atk}
            onChange={handleChange}
            variant="standard"
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>Total ATK</Typography>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="total_atk"
            value={values.total_atk}
            onChange={handleChange}
            variant="standard"
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>CTK Rate</Typography>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="ctk_rate"
            value={values.ctk_rate}
            onChange={handleChange}
            variant="standard"
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>CTK DMG</Typography>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="ctk_dmg"
            value={values.ctk_dmg}
            onChange={handleChange}
            variant="standard"
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>Element Buff</Typography>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="ele_buff"
            value={values.ele_buff}
            onChange={handleChange}
            variant="standard"
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>Ele Mastery</Typography>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="ele_mastery"
            value={values.ele_mastery}
            onChange={handleChange}
            variant="standard"
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>Reaction Ratio</Typography>
        </Grid>

        <Grid item xs={8}>
          <FormControl variant="standard" sx={{ minWidth: 200 }}>
            <Select value={values.react_ratio} onChange={handleChange} name="react_ratio">
              <MenuItem value={1}>1 (No Reaction)</MenuItem>
              <MenuItem value={1.5}>1.5 (Fire&rarr;Water/Ice&rarr;Fire)</MenuItem>
              <MenuItem value={2}>2.0 (Water&rarr;Fire/Fire&rarr;Ice)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
