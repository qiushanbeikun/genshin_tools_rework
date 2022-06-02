import {createTheme} from "@mui/material/styles";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const theme = createTheme({
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
export const StyledAppBarLink = styled(Link)`
  color: white;
  margin: auto 1em;
`;
export const AuthButtons = styled.div`
  position: absolute;
  right: 0;
  margin: auto 1em;
  white-space: nowrap;
`;
