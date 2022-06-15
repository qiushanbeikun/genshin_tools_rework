import {Route, Routes} from "react-router-dom";
import * as React from "react";
import Homepage from "../app/homepage";
import {Workshop} from "../app/artifact_generator";
import Signup from "../app/authentication/components/signup";
import Login from "../app/authentication/components/login";
import Profile from "../app/authentication/components/profile";
import {LoginOverride, LoginRequiredRoute} from "./protectedRoutes";
import AddArtifact from "../app/artifact_generator/components/AddArtifact/addArtifact";

export default function MyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage/>}/>
      <Route exact path="/artifact_generator" element={<Workshop/>}/>
      <Route exact path="/signup" element={<LoginOverride><Signup/></LoginOverride>}/>
      <Route exact path="/login" element={<LoginOverride><Login/></LoginOverride>}/>
      <Route exact path="/recovery" element={<Signup/>}/>
      <Route exact path="/profile" element={<LoginRequiredRoute><Profile/></LoginRequiredRoute>}/>
      <Route exact path="/upload_artifact" element={<AddArtifact/>}/>
    </Routes>
  )
}
