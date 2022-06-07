import {Box, Button} from "@mui/material";
import i18n from "../../../localization/i18n";
import * as React from "react";

export default function BtnGroup({func}) {
  return (
    <Box sx={{m: "1em", textAlign: "center"}}>
      <Button variant="contained" type="submit">
        {i18n.t("generator_ui:generate")}
      </Button>

      <Button variant="contained" color="error" onClick={func}>
        {i18n.t("generator_ui:clear")}
      </Button>
    </Box>
  )
}
