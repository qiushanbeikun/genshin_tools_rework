import {makeStyles} from "@mui/styles";
import background from "../../../../assets/images/authentication/auth_background.jpg";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 64px)",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  size: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  paper: {
    margin: theme.spacing(4, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "50vw"
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main
  },
}));
