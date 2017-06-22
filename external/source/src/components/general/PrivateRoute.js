import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Helpers
import { meApi } from './../../shared/ApiService';

// Components
import LoadingPage from './LoadingPage';

const token = localStorage.getItem('token');

const checkMe = async props => {
  let auth = await meApi(token);
  let success = auth.status >= 200 && auth.status < 300;

  if (success) {
    props.setToken(token);
    auth.json().then(resp => {
      props.setActiveUser(resp);
    });
  }

  return success;
};

export default function({ component: Component, props, ...rest }) {
  const redirect = (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: props.location }
      }}
    />
  );

  if (!props.token && !token) {
    return <Route {...rest} render={props => redirect} />;
  }

  if (!props.token) {
    let isLoading = true;

    checkMe(props).then(resp => {
      isLoading = resp;
    });

    if (props.token) {
      return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
      const component = isLoading ? <LoadingPage /> : redirect;
      return <Route {...rest} render={props => component} />;
    }
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}
