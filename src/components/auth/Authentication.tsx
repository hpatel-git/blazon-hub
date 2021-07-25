import React from 'react';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Config } from '../../config/Config';
import { AuthClientError, AuthClientEvent } from '@react-keycloak/core';
import AuthBackdrop from './AuthBackdrop';
import { useAppDispatch } from '../../redux/hooks';
import { updateUserProfile } from '../../redux/auth/authSlice';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Admin from '../../layouts/Admin';
import '../../assets/css/material-dashboard-react.css?v=1.6.0';

function Authentication() {
  const keycloak = Keycloak({
    url: `${Config.root.KEYCLOAK_BASE_URL}/auth`,
    realm: Config.root.REALM,
    clientId: Config.root.CLIENT_ID
  });

  const loadingComponent = <AuthBackdrop />;
  const dispatch = useAppDispatch();
  const initOptions = { pkceMethod: 'S256' };

  const handleOnEvent = async (
    eventType: AuthClientEvent,
    error?: AuthClientError
  ) => {
    if (!keycloak.authenticated) {
      keycloak.login();
    }
    if (eventType === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        keycloak
          .loadUserProfile()
          .then(function (profile: KeycloakProfile) {
            dispatch(updateUserProfile(profile));
          })
          .catch(function () {
            keycloak.logout();
          });
      }
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
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
