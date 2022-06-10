import {GenshinStyles} from "../../../../theme";
import {useTranslation} from "react-i18next";
import {useFormikContext} from "formik";
import * as React from "react";
import {Fragment, useEffect} from "react";
import {INITIAL_ARTI_CONFIG, VICE_PROP_TYPE} from "./constants";
import {getNewUsedProps, getNewViceProps, isEnhanceAble} from "./utils";
import {Button, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {StyledButtonGroup, VicePropInput} from "../../styles";

export function VicePropRow({index}) {

  const classes = GenshinStyles();
  const {t} = useTranslation("generator_ui");
  const {values: {vice_props, position, main_prop, used_props}, setFieldValue} = useFormikContext();
  const [prop, count] = Object.values(vice_props[index]);

  useEffect(() => {
    // todo touched not working here, need to investigate to optimize rendering
      console.log("triggered reset of vice props");
      setFieldValue("vice_props", INITIAL_ARTI_CONFIG.vice_props);
  }, [position, main_prop])

  const vicePropHandler = (ctx) => {
    const prevProp = vice_props[index].prop;
    const curProp = ctx.prop;
    if (prevProp !== curProp) {
      setFieldValue("used_props", getNewUsedProps(used_props, ctx.prop, prevProp));
    }
    setFieldValue("vice_props", getNewViceProps(vice_props, ctx, index));
  }

  return (
    <Fragment key={index}>
      <Grid item xs={7}>
        <VicePropInput sx={{m: 1, minWidth: 120}}>
          <InputLabel className={classes.root}>{t("secondary_property")} {index + 1}</InputLabel>
          <Select value={prop} className={classes.root}
                  onChange={(e) => {
                    vicePropHandler({prop: e.target.value, count: count})
                  }}>
            <MenuItem value={0} className={classes.root}>{t("not_selected")}</MenuItem>
            {VICE_PROP_TYPE.map((each, i) =>
              <MenuItem key={each} value={i + 1} disabled={used_props.includes(each)}
                        className={classes.root}>{each}</MenuItem>
            )}
          </Select>
        </VicePropInput>
      </Grid>

      <Grid item xs={5}>
        <StyledButtonGroup size="large" aria-label="small outlined button group">
          <Button onClick={() => {
            const newCount = count - 1;
            vicePropHandler({prop: prop, count: newCount})
          }}
                  disabled={count <= 1}>-</Button>
          {<Button disabled>{count}</Button>}
          <Button onClick={() => {
            const newCount = count + 1;
            vicePropHandler({prop: prop, count: newCount})
          }}
                  disabled={(!isEnhanceAble(vice_props))}>+</Button>
        </StyledButtonGroup>
      </Grid>
    </Fragment>
  )
}
