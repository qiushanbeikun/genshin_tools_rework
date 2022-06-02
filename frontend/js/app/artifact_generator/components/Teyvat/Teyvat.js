import * as React from "react";
import {useState} from "react";
import {Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";
import {GenshinStyles} from "../../../../theme";
import {ARTIFACT_POSITIONS, INITIAL_ARTI_CONFIG} from "./constants";
import {getParsedArtiConfig, upperCase} from "./utils";
import background from "../../../../../assets/images/erased_template.png";
import {SImg} from "../../styles";
import {useTranslation} from "react-i18next";
import {FormikProvider, useFormik} from "formik";
import {MainPropSelect} from "./mainPropSelect";
import {VicePropRow} from "./vicePropRow";
import axios from "axios";

export default function Teyvat() {

  const classes = GenshinStyles();
  const {t, i18n} = useTranslation("generator_ui");
  const [artifact, setArtifact] = useState();

  const handleSubmit = (values) => {
    console.log(values);
    const artiConfig = getParsedArtiConfig(values);
    axios.post("/artifact_generator/teyvat/", artiConfig).then((res) => {
      setArtifact(res.data.data);
    })
  }

  const formik = useFormik({
    initialValues: INITIAL_ARTI_CONFIG,
    onSubmit: handleSubmit,
  })


  return (
    <FormikProvider value={formik}>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={6}>
          <h4>Editor</h4>

          <form onSubmit={formik.handleSubmit}>

            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.root}>{t("artifact_position")}</FormLabel>
              <RadioGroup row name="position" value={formik.values.position} onChange={formik.handleChange}>
                {ARTIFACT_POSITIONS.map((pos) =>
                  <FormControlLabel value={pos} control={<Radio/>} className={classes.root} label={upperCase(pos)}/>
                )}
              </RadioGroup>
            </FormControl>

            <MainPropSelect name="main_prop"/>

            <Grid container spacing={1}>
              {[0, 1, 2, 3].map((index) => <VicePropRow index={index}/>)}

            </Grid>

            <Button variant="contained" type="submit" className="submit_button">{t("generate")}</Button>
          </form>
        </Grid>

        <Grid item xs={6}>
          <h4>{t("artifact_screenshot")}</h4>
          {!!artifact ? <SImg src={`data:image/png;base64,${artifact}`}/> : <SImg src={background}/>}
        </Grid>
      </Grid>
    </FormikProvider>
  )
}

