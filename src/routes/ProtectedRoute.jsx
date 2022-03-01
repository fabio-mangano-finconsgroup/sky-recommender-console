import React from 'react';
import useAuth from '../hooks/useAuth';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  console.log(auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
