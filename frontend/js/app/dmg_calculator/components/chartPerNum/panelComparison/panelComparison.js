import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { getContext } from './utils';

export default function PanelComparison({ panels }) {
  const { ids, rows } = getContext(panels);
  console.log(ids, rows);
  return (
    <>
      <Typography variant="h5">Panel Comparison</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {ids.map((id) => (
                <TableCell>{id}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow>
                  <TableCell>{row.key}</TableCell>
                  {ids.map((id) => (
                    <TableCell>{row[id - 1]}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
