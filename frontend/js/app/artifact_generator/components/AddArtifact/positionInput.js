import * as React from "react";
import {Grid, TextField} from "@mui/material";
import {useFormikContext} from "formik";
import {Fragment} from "react";
import {INDEX_TO_NAME_POSITION} from "./constants";

export default function PositionInput({index}) {

  const {values: {names, images}, setFieldValue, handleChange} = useFormikContext();

  const handleImgUpload = async (e) => {
    // image must be square, >= 256*256 and <= 1024*1024

  }

  return (
    // for now, image uploads are disable as
    <Fragment key={index}>
      <Grid item xs={3}>{INDEX_TO_NAME_POSITION[index]}</Grid>
      <Grid item xs={5}>
        <TextField name={`names[${index}]`} value={names[index]} onChange={handleChange} variant="standard"/>
      </Grid>
      <Grid item xs={4}>
        <input type="file" accept="image/*" id="select_artifact_img" onChange={handleImgUpload} disabled/>
      </Grid>
    </Fragment>
  )
}
