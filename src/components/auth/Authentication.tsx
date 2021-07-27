import React from 'react';
import { KeycloakProfile } from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloakConfig from '../../config/keycloakConfig';
import { AuthClientError, AuthClientEvent } from '@react-keycloak/core';
import AuthBackdrop from './AuthBackdrop';
import { useAppDispatch } from '../../redux/hooks';
import { updateUserProfile, updateUserToken } from '../../redux/auth/authSlice';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Admin from '../../layouts/Admin';
import '../../assets/css/material-dashboard-react.css?v=1.6.0';

function Authentication() {
  const loadingComponent = <AuthBackdrop />;
  const dispatch = useAppDispatch();
  const initOptions = { pkceMethod: 'S256' };

  const handleOnEvent = async (
    eventType: AuthClientEvent,
    error?: AuthClientError
  ) => {
    if (!keycloakConfig.authenticated) {
      keycloakConfig.login();
    }
    if (eventType === 'onAuthSuccess') {
      if (keycloakConfig.authenticated) {
        dispatch(updateUserToken(keycloakConfig.token));
        keycloakConfig
          .loadUserProfile()
          .then(function (profile: KeycloakProfile) {
            dispatch(updateUserProfile(profile));
          })
          .catch(function () {
            keycloakConfig.logout();
          });
      }
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloakConfig}
      initOptions={initOptions}
      LoadingComponent={loadingComponent}
      onEvent={(event: any, error: any) => handleOnEvent(event, error)}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default Authentication;
