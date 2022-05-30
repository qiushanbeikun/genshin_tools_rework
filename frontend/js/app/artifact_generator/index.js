import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {GenshinStyles} from "../../theme";
import Celestia from "./components/Celestia/Celestia";
import Teyvat from "./components/Teyvat/Teyvat";
import {ModeSelector} from "./styles";

export const Workshop = () => {

  const classes = GenshinStyles();

  const [mode, setMode] = useState("teyvat");

  const handleModeChange = (e) => {
    e.preventDefault();
    setMode(e.target.value);
  }

  return (
    <div>
      <ModeSelector>
        <ToggleButtonGroup color="primary" value={mode} exclusive onChange={handleModeChange}>
          <ToggleButton value="teyvat" className={classes.root}>Teyvat</ToggleButton>
          <ToggleButton value="celestia" className={classes.root}>Celestia</ToggleButton>
        </ToggleButtonGroup>
      </ModeSelector>
      <div>
        {mode === "teyvat" ? <Teyvat/> : <Celestia/>}
      </div>
    </div>
  )
}
