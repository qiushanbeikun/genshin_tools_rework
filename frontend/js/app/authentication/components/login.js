import {Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {ErrorMessage, FormikProvider, useFormik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import Copyright from "./copyright";
import * as React from "react";
import {INITIAL_LOGIN_FIELDS} from "./constants";
import {loginValidation} from "./validations";
import {useStyles} from "./styles";
import axios from "axios";
import authSlice from "../../../store/slices/auth";
import {useDispatch} from "react-redux";

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    axios.post("/api/auth/login/", values).then((res) => {
      console.log(res);
      dispatch(
        authSlice.actions.setAuthTokens({
          token: res.data.access,
          refreshToken: res.data.refresh,
        })
      );
      dispatch(authSlice.actions.setAccount(res.data.user));
      // navigate("/");
    })
      .catch(e => alert("账号已封禁，若疑为误封，请邮件联系作者。"))
  }

  const formik = useFormik({
    initialValues: INITIAL_LOGIN_FIELDS,
    onSubmit: handleLogin,
    validationSchema: loginValidation,
  })

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={1} square className={classes.size}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">Login</Typography>

          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <TextField name="email" type="email" variant="outlined" margin="normal" label="Email" fullWidth
                         value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <ErrorMessage name="email"/>
              <TextField name="password" type="password" variant="outlined" margin="normal" label="Password" fullWidth
                         value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <ErrorMessage name="password"/>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember Me"/>

              <Button type="submit" fullWidth variant="contained" color="primary">Login</Button>

              <Box my={1.5}>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                <Link to="/recovery" variant="body2">
                  {"Forgot Password"}
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
