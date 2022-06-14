import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const LoginRequiredRoute = ({children}) => {
  const account = useSelector((state: RootState) => state.auth.account);
  return (!account) ? <Navigate to="/login"/> : children;
};

export const LoginOverride = ({children}) => {
  const account = useSelector((state: RootState) => state.auth.account);
  return (account) ? <Navigate to="/profile" replace/> : children;
}



