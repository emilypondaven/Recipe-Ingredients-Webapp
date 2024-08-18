import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user is authenticated, render the component
  return <Component {...rest} />;
};

export default PrivateRoute;