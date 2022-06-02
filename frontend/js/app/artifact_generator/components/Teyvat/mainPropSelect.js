import {GenshinStyles} from "../../../../theme";
import {useTranslation} from "react-i18next";
import {useFormikContext} from "formik";
import * as React from "react";
import {useEffect} from "react";
import {DEFAULT_MAIN_PROP, POSITION_CONSTRAINTS} from "./constants";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export function MainPropSelect(props) {

  const classes = GenshinStyles();
  const {t} = useTranslation("generator_ui");
  const {values: {position, main_prop}, setFieldValue} = useFormikContext();
  const constraint = POSITION_CONSTRAINTS[position];

  useEffect(() => {
    setFieldValue(props.name, DEFAULT_MAIN_PROP);
    setFieldValue("used_props", [constraint[0]])
  }, [position])

  const handlePosChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFieldValue("main_prop", value);
    setFieldValue("used_props", [constraint[value]])
  }

  return (
    <FormControl sx={{m: 1, minWidth: 120}}>
      <InputLabel id="demo-simple-select-helper-label" className={classes.root}>{t("main_property")}</InputLabel>
      <Select value={main_prop} onChange={handlePosChange} {...props}>
        {POSITION_CONSTRAINTS[position].map((each, index) => (
          <MenuItem key={each} value={index} className={classes.root}>{each}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
