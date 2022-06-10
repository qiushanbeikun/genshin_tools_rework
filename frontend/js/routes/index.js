import {Route, Routes} from "react-router-dom";
import * as React from "react";
import Homepage from "../app/homepage";
import {Workshop} from "../app/artifact_generator";
import Signup from "../app/authentication/components/signup";
import Login from "../app/authentication/components/login";
export default function MyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage/>}/>
      <Route exact path="/artifact_generator" element={<Workshop/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/login" element={<Login/>}/>
      {/*<Route exact path="/recovery" element={<Signup/>}/>*/}
    </Routes>
  )
}
