import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {createTheme} from '@mui/material/styles';
import styled from "@emotion/styled";
import {GenshinStyles} from "../../theme";
import {useTranslation} from "react-i18next";

const theme = createTheme({
  palette: {
    primary: {
      light: '#77b7e3',
      main: '#3086b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const StyledAppBarLink = styled(Link)`
  color: white;
  margin: auto 1em;
`;

const AuthButtons = styled.div`
  position: absolute;
  right: 0;
  margin: auto 1em;
`;


export default function ButtonAppBar() {

  const classes = GenshinStyles();

  // const {t, i18n} = useTranslation("translations", {keyPrefix: "navbar"});
  const {t, i18n} = useTranslation("navbar");

  return (
    <>
      <AppBar position="relative" theme={theme}>
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
              <StyledAppBarLink to="/artifact_generator" theme={theme}>{t("artifact_generator")}</StyledAppBarLink>
            </Typography>

            <Typography variant="h6" component="div" className={classes.root}>
              <StyledAppBarLink to="/damage_calculator" theme={theme}>{t("damage_calculator")}</StyledAppBarLink>
            </Typography>

            <Typography variant="h6" component="div" className={classes.root}>
              <StyledAppBarLink to="/others" theme={theme}>{t("others")}</StyledAppBarLink>
            </Typography>
          </>

          <AuthButtons>
            <Button color="inherit" className={classes.root}>{t("sign_up")}</Button>
            <Button color="inherit" className={classes.root}>{t("login")}</Button>
          </AuthButtons>

        </Toolbar>
      </AppBar>
    </>
  );
}
