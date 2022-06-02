import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {GenshinStyles} from "../../theme";
import Celestia from "./components/Celestia/Celestia";
import Teyvat from "./components/Teyvat/Teyvat";
import {ModeSelector} from "./styles";
import {useTranslation} from "react-i18next";

export const Workshop = () => {

  const classes = GenshinStyles();
  const {t, i18n} = useTranslation("generator_ui");

  const [mode, setMode] = useState("teyvat");

  const handleModeChange = (e) => {
    e.preventDefault();
    setMode(e.target.value);
  }

  return (
    <div>
      <ModeSelector>
        <ToggleButtonGroup color="primary" value={mode} exclusive onChange={handleModeChange}>
          <ToggleButton value="teyvat" className={classes.root}>{t("teyvat")}</ToggleButton>
          <ToggleButton value="celestia" className={classes.root}>{t("celestia")}</ToggleButton>
        </ToggleButtonGroup>
      </ModeSelector>
      <div>
        {mode === "teyvat" ? <Teyvat/> : <Celestia/>}
      </div>
    </div>
  )
}
