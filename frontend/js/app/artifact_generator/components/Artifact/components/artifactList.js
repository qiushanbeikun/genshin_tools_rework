import * as React from "react";
import {FormikProvider, useFormik, useFormikContext} from "formik";
import axios from "axios";
import * as qs from "query-string"
import {Box, Button, Grid, TextField} from "@mui/material";
import {useDebounce} from "react-use";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../../store";

function useIsMounted() {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted.current;
}

const StyledArtiRow = styled(Grid)`
  vertical-align: center;
  padding: 1em;
  border-bottom: 1px solid #d1d1d1;
`;

export default function ArtifactList() {

  const isMounted = useIsMounted();
  const {t, i18n} = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);

  const headers = {
    Authorization: auth.token ? `Bearer ${auth.token}` : null,
  }

  const formik = useFormik({
    initialValues: {
      search_term: "",
      artifacts: [],
    },
  })

  useEffect(() => {
    handleSearch();
  }, [])

  const handleSearch = () => {
    axios.get(`/artifact_generator/artifact/?${qs.stringify({
      search_term: formik.values.search_term,
      lang: i18n.language
    })}`, {headers: headers}).then(res => {
      formik.setFieldValue("artifacts", res.data)
    })
  }

  useDebounce(() => {
    if (!isMounted) {
      return;
    }
    handleSearch(formik.values.search_term)
  }, 500, [formik.values.search_term]);

  return (
    <Box sx={{m: "1em"}}>
      <Box sx={{my: "1em"}}>
        <FormikProvider value={formik}>
          <TextField name="search_term" fullWidth value={formik.values.search_term} onChange={formik.handleChange}
                     label="Search to update an existing template or create a new template."/>
        </FormikProvider>
      </Box>
      <br/>
      <StyledArtiRow container spacing={1} justify="center" sx={{backgroundColor: "#eeeeee"}}>
        <Grid item xs={1}>
          Portrait
        </Grid>
        <Grid item xs={2}>
          Artifact title
        </Grid>
        <Grid item xs={8}>
          Artifact Description Preview
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </StyledArtiRow>

      {
        (formik.values.artifacts.length !== 0) ?
          formik.values.artifacts.map((artifact) =>
            <StyledArtiRow container spacing={1} justify="center">
              <Grid item xs={1}>
                Portrait
              </Grid>
              <Grid item xs={2}>
                {artifact.title}
              </Grid>
              <Grid item xs={8}>
                {artifact.flower_desc}
              </Grid>
              <Grid item xs={1}>
                <Link to={`/upload_artifact/${artifact.id}`}>
                  <Button variant="contained">Details</Button>
                </Link>
              </Grid>
            </StyledArtiRow>
          )
          :
          <Box sx={{m: "1em", textAlign: "center"}}>
            <Typography sx={{p: "1em"}}>No artifact template found, create a new template?</Typography>
            <Link to="/upload_artifact">
              <Button variant="contained">Create a new artifact template</Button>
            </Link>
          </Box>
      }
    </Box>
  )
}
