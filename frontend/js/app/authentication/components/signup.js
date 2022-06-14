import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {ErrorMessage, FormikProvider, useFormik} from "formik";
import {INITIAL_REGISTER_FIELDS} from "./constants";
import {Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import Copyright from "./copyright";
import {useStyles} from "./styles";
import axios from "axios";
import {useDebounce} from "react-use";
import qs from "query-string";
import {useIsMounted} from "./utils";
import {signUpValidation} from "./validations";

function EmailAvailability({state}) {
  switch (state) {
    case "true":
      return <Typography>Email Okay</Typography>
    case "false":
      return <Typography>Email used</Typography>
    default:
      return <></>
  }
}


export default function Signup() {

  const classes = useStyles();
  const isMounted = useIsMounted();
  const navigate = useNavigate();

  const handleSignUp = (values) => {
    console.log(values);
    axios.post("/api/auth/register/", values).then((res) => {
      console.log(res)
      alert("Sign Up succeed, will");
      setTimeout(() => {
        navigate("/login");
      }, 2000)

    })
  }

  const formik = useFormik({
    initialValues: INITIAL_REGISTER_FIELDS,
    onSubmit: handleSignUp,
    validationSchema: signUpValidation,
  })

  useDebounce(() => {
    if (!isMounted) {
      return;
    }
    const email = formik.values.email;
    // console.log("check email availability");
    axios.get(`/api/auth/check_email/?${qs.stringify({email})}`).then((res) => {
      // console.log(res.data.data);
      (res.data.data === "true") ? console.log("email ok") : console.log("email used");
    })

  }, 1000, [formik.values.email])

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={1} square className={classes.size}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">Sign Up</Typography>

          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <TextField name="username" type="text" variant="outlined" margin="normal" label="Username" fullWidth
                         value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <ErrorMessage name="username"/>
              <TextField name="email" type="email" variant="outlined" margin="normal" label="Email" fullWidth
                         value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <ErrorMessage name="email"/>
              <TextField name="password" type="password" variant="outlined" margin="normal" label="Password" fullWidth
                         value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <ErrorMessage name="password"/>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember Me"/>

              <Button type="submit" fullWidth variant="contained" color="primary">Sign Up</Button>

              <Box my={1.5}>
                <Link to="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Box>

              <Box mt={5}>
                <Copyright/>
              </Box>

            </form>
          </FormikProvider>
        </div>
      </Grid>
    </Grid>
  )
}
