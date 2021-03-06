import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import {Box, Button} from "@mui/material";
import {GenshinStyles} from "../../theme";
import {useTranslation} from "react-i18next";
import LangChange from "./langChange";
import {StyledAppBarLink} from "./styles";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import AuthButtons from "./authButtons";

export default function ButtonAppBar() {

  const classes = GenshinStyles();
  const {t} = useTranslation("navbar");

  return (
    <AppBar position="relative">
      <Toolbar>
        <Link to="/">
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              mr: 2,
              color: 'white'
            }}
          >
            <MenuIcon/>
          </IconButton>
        </Link>
        <>
          <Typography variant="h6" component="div" className={classes.root}>
            <StyledAppBarLink to="/">{t("home")}</StyledAppBarLink>
          </Typography>

          <Typography variant="h6" component="div" className={classes.root}>
            <StyledAppBarLink to="/artifact_generator">{t("artifact_generator")}</StyledAppBarLink>
          </Typography>

          <Typography variant="h6" component="div" className={classes.root}>
            <StyledAppBarLink to="/damage_calculator">{t("damage_calculator")}</StyledAppBarLink>
          </Typography>

          <Typography variant="h6" component="div" className={classes.root}>
            <StyledAppBarLink to="/others">{t("others")}</StyledAppBarLink>
          </Typography>
        </>

        <AuthButtons/>

      </Toolbar>
    </AppBar>
  );
}
