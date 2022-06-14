import * as yup from "yup";
import {debounce} from "lodash";
import axios from "axios";
import qs from "query-string";


export const signUpValidation = () => yup.object({
  username: yup.string().trim().required("Username is required")
    .min(4, "Username requires at least 4 characters."),
  email: yup.string().trim().email("Please check email").required("Email is required")
    // .test("email availability", "Email address already used", async (email) => {
    //   console.log(email)
    //   const res = await emailValidationApi(email);
    //   console.log("!@#!@#@!#@#", res)
    //   return res
    // })
  ,
  password: yup.string().trim()
    .required()
    .min(8, "Password needs to be at least 8 characters")
    .matches(/[a-zA-Z0-9]/, "Only letters and numbers are permitted")
})

const emailValidationApi = async (email) => {
  axios.get(`/api/auth/check_email/?${qs.stringify({email})}`).then((response) => {
    console.log(response.data.data === "true")
    return response.data.data === "true";
  })
}


export const loginValidation = () => yup.object({
  password: yup.string().trim().required("Password is required"),
  email: yup.string().trim().email("Please check email").required("Email is required")
})

export const profileValidation = () => yup.object({
  username: yup.string().required("Username is required")
    .min(4, "Username requires at least 4 characters.")
})
