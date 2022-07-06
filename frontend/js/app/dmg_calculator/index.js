import * as React from 'react';
import { Box, Button, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import Panel from './components/panel';
import ChartPerNum from './components/chartPerNum/chartPerNum';
import { INITIAL_PANEL, MOCK_PANELS } from './components/constants';
import { useState } from 'react';
import PanelComparison from './components/chartPerNum/panelComparison/panelComparison';
import { isPanelExist, newPanels } from './components/chartPerNum/panelComparison/utils';

export default function DmgCalculator() {
  const formik = useFormik({
    initialValues: INITIAL_PANEL,
  });

  const [mode, setMode] = useState('panel_comparison');
  // const [panels, setPanels] = useState([{ id: 1, panel: INITIAL_PANEL }]);
  const [panels, setPanels] = useState(MOCK_PANELS);

  const handleAddPanel = () => {
    if (!isPanelExist(formik.values, panels)) {
      setPanels(newPanels(formik.values, panels));
    } else {
      console.log('panel already exist');
    }
  };

  const handleRemovePanel = (e, id) => {
    e.preventDefault();
    console.log(id);
    if (panels.length === 1) {
      return;
    }
    const copy = [...panels];
    const idx = copy.findIndex((panel) => panel.id === id);
    copy.splice(idx, 1);
    console.log(copy);
    setPanels(copy);
  };

  return (
    <Box maxWidth="lg" sx={{ m: '1em auto' }}>
      <FormikProvider value={formik}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="h5">Current Panel</Typography>
            <Box sx={{ m: '1em 0' }}>
              <Panel />
            </Box>

            {mode === 'panel_comparison' && (
              <Button variant="contained" onClick={handleAddPanel}>
                Add
              </Button>
            )}
          </Grid>

          <Grid item xs={8}>
            <ToggleButtonGroup
              color="primary"
              value={mode}
              exclusive
              onChange={(e) => setMode(e.target.value)}
            >
              <ToggleButton value="chart_per_num">Mar. Num</ToggleButton>
              <ToggleButton value="chart_per_bonus" disabled>
                Mar. Bonus(WIP)
              </ToggleButton>
              <ToggleButton value="panel_comparison">Panel Comparison</ToggleButton>
            </ToggleButtonGroup>

            <ChartSelection mode={mode} panels={panels} removeFunc={handleRemovePanel} />
          </Grid>
        </Grid>
      </FormikProvider>
    </Box>
  );
}

const ChartSelection = ({ mode, panels, removeFunc }) => {
  switch (mode) {
    default:
    case 'chart_per_num':
      return <ChartPerNum />;
    case 'chart_per_bonus':
      return <></>;
    case 'panel_comparison':
      return <PanelComparison indexedPanels={panels} removeFunc={removeFunc} />;
  }
};
