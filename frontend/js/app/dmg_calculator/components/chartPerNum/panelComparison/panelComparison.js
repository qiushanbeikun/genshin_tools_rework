import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { dmgCompare, buildTableContent } from './utils';
import { panelsToDmgList } from '../chart_utils/utils';
import IconButton from '@mui/material/IconButton';
import { tableStyles } from './tableStyles';

export default function PanelComparison({ indexedPanels, removeFunc }) {
  const { ids, rows } = buildTableContent(indexedPanels);
  // console.log(rows);
  const dmgBundles = panelsToDmgList(indexedPanels.map((panel) => panel.panel));
  const dmgCompareList = dmgCompare(dmgBundles);

  const classes = tableStyles();
  return (
    <>
      <Box sx={{ m: '1em 0' }}>
        <Typography variant="h5">Panel Comparison</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>ID</TableCell>
              {ids.map((id) => (
                <TableCell>
                  {`Preset ${id}`}
                  <IconButton variant="standard" color="warning" onClick={(e) => removeFunc(e, id)}>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow>
                  <TableCell className={classes.tableHead}>{row.keyText}</TableCell>
                  {ids.map((id, index) => (
                    <TableCell>{row[index]}</TableCell>
                  ))}
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell className={classes.tableHead}>Relative DMG</TableCell>
              {dmgCompareList.map((dmg) => (
                <TableCell className={classes.relDmg}>{dmg}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
