import {Route, Routes} from "react-router-dom";
import * as React from "react";
import Homepage from "../app/homepage";
import {Workshop} from "../app/artifact_generator";
export default function MyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage/>}/>
      <Route path="/artifact_generator" element={<Workshop/>}/>
    </Routes>
  )
}
