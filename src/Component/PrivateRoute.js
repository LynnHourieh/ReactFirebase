import React, { useContext } from "react";
import {  Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";


//private route to protect our routes 
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
