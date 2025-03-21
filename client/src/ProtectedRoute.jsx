import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./context/AppContext";

const ProtectedRoute = ({ element, isPrivate, isAuth }) => {
  const [context] = useAppContext();
  const { auth, checkingStatus } = context;

  if (checkingStatus) {
    return (
      <div></div>
    );
  }


  if (isPrivate) {
    return auth !== null ? element : <Navigate to="/login" />;
  } else if (isAuth) {
    return auth === null ? element : <Navigate to='/' />
  } else {
    return element
  }
};

export default ProtectedRoute;
