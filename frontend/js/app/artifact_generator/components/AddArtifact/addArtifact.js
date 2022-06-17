import * as React from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {FormikProvider, useFormik} from "formik";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../store";
import {INITIAL_FORM_VALUE} from "./constants";
import PositionInput from "./positionInput";
import {useNavigate, useParams} from "react-router-dom";
import BtnGroup from "../btnGroup";
import Desc from "./desc";
import {useEffect} from "react";
import axios from "axios";
import qs from "query-string";
import i18n from "../../../../localization/i18n";


export default function AddArtifact() {

  const {t, i18n} = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);
  const {id} = useParams();
  const navigate = useNavigate();
  const language = i18n.language;

  const headers = {
    Authorization: auth.token ? `Bearer ${auth.token}` : null,
  }

  const handleSubmit = (values, language) => {
    const payload = {...values};
    payload.contributor = auth.account.email;
    payload.language = language;
    axios.post("/artifact_generator/add_artifact/", payload, {headers: headers}).then(res => {
      console.log(res);
      refreshArti(res.data);
      // alert(id ? 'Upload succeed.' : 'Update succeed')
    })
  }

  /**
   *
   * @param id
   * @param publish Note this publish here is the target state, if want to make release arti, it should be true
   */
  const handlePublish = (id, publish) => {
    axios.post(`/artifact_generator/publish/`, {
      id: id,
      production: publish
    }, {headers: headers}).then(res => formik.setFieldValue("production", res.data.production))
  }

  const handleDelete = (id) => {
    alert("double check to delete")
    axios.delete(`/artifact_generator/delete/${id}`, {headers: headers})
      .then(res => console.log("not implemented"))
  }

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUE,
    onSubmit: (values) => handleSubmit(values, language),
  });

  const refreshArti = (data) => {
    formik.setFieldValue("id", data.id)
    formik.setFieldValue("title", data.title)
    formik.setFieldValue("names", [data.flower, data.feather, data.glass, data.cup, data.head]);
    formik.setFieldValue("img_path", data.img_path);
    formik.setFieldValue("two_set_buff", data.two_set_buff);
    formik.setFieldValue("four_set_buff", data.four_set_buff);
    formik.setFieldValue("descs",
      [data.flower_desc, data.feather_desc, data.glass_desc, data.cup_desc, data.head_desc]);
    formik.setFieldValue("production", data.production)
  }

  useEffect(() => {
    id && axios.get(`/artifact_generator/artifact/?${qs.stringify({id: id, lang: language})}`,
      {headers: headers}).then(res => {
      refreshArti(res.data[0])
    })
  }, [])

  return (
    <Box maxWidth="lg" sx={{m: "1em auto"}}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4" paragraph>Properties</Typography>
                </Grid>
                <Grid item xs={3}>
                  Title
                </Grid>
                <Grid item xs={8}>
                  <TextField value={formik.values.title} name="title" onChange={formik.handleChange} fullWidth
                             variant="standard"/>
                </Grid>

                {[0, 1, 2, 3, 4].map((index) => <PositionInput index={index} target="name"/>)}
                {[0, 1, 2, 3, 4].map((index) => <PositionInput index={index} target="desc"/>)}

                <Grid item xs={3}>
                  Image Path
                </Grid>
                <Grid item xs={8}>
                  <TextField value={formik.values.img_path} name="img_path" onChange={formik.handleChange}
                             fullWidth variant="standard"/>
                </Grid>
                <Grid item xs={3}>
                  2-Set Bonus
                </Grid>
                <Grid item xs={8}>
                  <TextField value={formik.values.two_set_buff} name="two_set_buff" onChange={formik.handleChange}
                             fullWidth variant="standard" multiline rows={2}/>
                </Grid>
                <Grid item xs={3}>
                  4-Set Bonus
                </Grid>
                <Grid item xs={8}>
                  <TextField value={formik.values.four_set_buff} name="four_set_buff" onChange={formik.handleChange}
                             fullWidth variant="standard" multiline rows={3}/>
                </Grid>
              </Grid>

              <Box sx={{m: "1em", textAlign: "center"}}>

                <Button variant="contained" type="submit" disabled={formik.values.production}>
                  {!!id ? "Update Template" : "Upload Template"}
                </Button>

                <Button variant="contained" color="error" onClick={() => formik.handleReset}>
                  {i18n.t("generator_ui:clear")}
                </Button>
                {auth.account.is_superuser &&
                <>
                  <Button variant="contained" color="error"
                          onClick={() => handlePublish(formik.values.id, !formik.values.production)}>
                    {formik.values.production ? "Unpublished" : "Publish"}
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(id)}>
                    Delete
                  </Button>
                </>
                }
              </Box>
            </form>
          </FormikProvider>
        </Grid>
        <Desc/>
      </Grid>
    </Box>
  )
}
