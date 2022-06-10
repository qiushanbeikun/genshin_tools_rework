import {Link, Typography} from "@mui/material";
import * as React from "react";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://qiushanbeikun.com/">
        QiushanBeikun
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
