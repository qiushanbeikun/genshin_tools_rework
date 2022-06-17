import * as React from "react";
import {useEffect} from "react";
import {FormikProvider, useFormik} from "formik";
import axios from "axios";
import * as qs from "query-string"
import {Box, Grid, TextField} from "@mui/material";
import {useDebounce} from "react-use";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../../store";
import {ArtiList} from "./singleArtiList";
import {useIsMounted} from "./debounceMount";

export default function ArtifactList() {

  const isMounted = useIsMounted();
  const {t, i18n} = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);
  const language = i18n.language;
  const headers = {
    Authorization: auth.token ? `Bearer ${auth.token}` : null,
  }

  const formik = useFormik({
    initialValues: {
      search_term: "",
      unpublished: [],
      published: [],
    },
  })

  useEffect(() => {
    handleSearch();
    listActiveArti();
  }, [])

  useDebounce(() => {
    if (!isMounted) {
      return;
    }
    handleSearch(formik.values.search_term)
  }, 500, [formik.values.search_term]);

  const handleSearch = () => {
    axios.get(`/artifact_generator/pending_artifact/?${qs.stringify({
      search_term: formik.values.search_term,
      lang: language,
    })}`, {headers: headers}).then(res => {
      formik.setFieldValue("unpublished", res.data)
    })
  }

  const listActiveArti = () => {
    axios.get(`/artifact_generator/active_artifact/?${qs.stringify({lang: language})}`, {headers: headers}).then(res => {
      formik.setFieldValue("published", res.data)
    })
  }

  return (
    <Box sx={{m: "1em"}}>
      <FormikProvider value={formik}>
        <Box sx={{my: "1em"}}>
          <TextField name="search_term" fullWidth value={formik.values.search_term} onChange={formik.handleChange}
                     label="Search to update an existing template or create a new template."/>
        </Box>
        <br/>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{m: "1em 0"}}>Artifact under review</Typography>
            <ArtiList target="unpublished"/>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{m: "1em 0"}}>Artifact templates in production</Typography>
            <ArtiList target="published"/>
          </Grid>
        </Grid>
        <br/>
      </FormikProvider>
    </Box>
  )
}


