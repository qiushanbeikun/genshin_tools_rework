import styled from "@emotion/styled";
import {Box, Button, Grid} from "@mui/material";
import {useFormikContext} from "formik";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import * as React from "react";

const StyledArtiRow = styled(Grid)`
  vertical-align: center;
  padding: 1em;
  border-bottom: 1px solid #d1d1d1;
`;

export function ArtiList({target}) {

  const {values} = useFormikContext();

  const artifacts = (target === "unpublished") ? values.unpublished : values.published;

  return (
    <>
      <StyledArtiRow container spacing={1} justify="center" sx={{backgroundColor: "#eeeeee"}}>
        <Grid item xs={2}>
          Portrait
        </Grid>
        <Grid item xs={8}>
          Artifact title
        </Grid>
        <Grid item xs={2}>
        </Grid>
      </StyledArtiRow>

      {
        artifacts.length !== 0 &&
        artifacts.map((artifact) =>
          <StyledArtiRow container spacing={1} justify="center">
            <Grid item xs={2}>
              Portrait
            </Grid>
            <Grid item xs={8}>
              {artifact.title}
            </Grid>
            <Grid item xs={2}>
              <Link to={`/upload_artifact/${artifact.id}`}>
                <Button variant="contained">Details</Button>
              </Link>
            </Grid>
          </StyledArtiRow>
        )
      }

      {
        target === "unpublished" && artifacts.length === 0 &&
        <Box sx={{m: "1em", textAlign: "center"}}>
          <Typography sx={{p: "1em"}}>No template under review, create a new template?</Typography>
          <Link to="/upload_artifact">
            <Button variant="contained">Create a new artifact template</Button>
          </Link>
        </Box>
      }
    </>
  )
}
