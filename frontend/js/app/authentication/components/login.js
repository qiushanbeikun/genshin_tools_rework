import {Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {ErrorMessage, FormikProvider, useFormik} from "formik";
import {Link} from "react-router-dom";
import Copyright from "./copyright";
import * as React from "react";
import {INITIAL_LOGIN_FIELDS} from "./constants";
import {loginValidation} from "./validations";
import {useStyles} from "./styles";


const handleLogin = () => {

}

export default function Login() {

  const classes = useStyles();

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
                <Link to="/signup" variant="body2" target="_blank">
                  {"Don't have an account? Sign Up"}
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
