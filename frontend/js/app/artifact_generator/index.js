import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {GenshinStyles} from "../../theme";
import Celestia from "./components/Celestia/Celestia";
import Teyvat from "./components/Teyvat/Teyvat";
import {ModeSelector} from "./styles";
import {useTranslation} from "react-i18next";

export const Workshop = ({g_mode}) => {

  const classes = GenshinStyles();
  const {t} = useTranslation("generator_ui");

  const [mode, setMode] = useState("teyvat");

  // preserve previous mode, keep the some mode after refresh
  const handleModeChange = (e) => {
    const mode = e.target.value;
    localStorage.setItem("generator_mode", mode);
    setMode(mode);
  }

  useEffect(() => {
    let prevMode = localStorage.getItem("generator_mode") || "teyvat";
    setMode(prevMode);
  }, [])

  return (
    <Box maxWidth="xl" sx={{m: "1em auto"}}>
      <ModeSelector>
        <ToggleButtonGroup color="primary" value={mode} exclusive onChange={handleModeChange}>
          <ToggleButton value="teyvat" className={classes.root}>{t("teyvat")}</ToggleButton>
          <ToggleButton value="celestia" className={classes.root}>{t("celestia")}</ToggleButton>
        </ToggleButtonGroup>
      </ModeSelector>
      <Box sx={{m: "1em"}}>
        {mode === "teyvat" ? <Teyvat/> : <Celestia/>}
      </Box>
    </Box>
  )
}
