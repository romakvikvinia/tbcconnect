import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { reselectUser } from '../../package/store/reselect/user.reselect';

//@ts-ignore
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(reselectUser);

  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location.pathname },
            }}
          />
        )
      }
    />
  );
};
