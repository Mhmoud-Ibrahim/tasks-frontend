

 import { Navigate } from 'react-router-dom';

import { MainContext } from "../Context.jsx";
import { useContext } from "react";


export default function ProtectedRoute(props) {
let {user} = useContext(MainContext);
  if (!user) {
    return <Navigate replace to="/" />;
  }
  return props.children
};


