import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  authed,
  socket,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !!JSON.parse(localStorage.getItem('userData')) ? (
          <Component socket={socket} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
