import React from 'react';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Config } from '../../config/Config';
import { AuthClientError, AuthClientEvent } from '@react-keycloak/core';
import Layout from '../layout/Layout';
import AuthBackdrop from './AuthBackdrop';
import { useAppDispatch } from '../../redux/hooks';
import { updateUserProfile } from '../../redux/auth/authSlice';

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
            console.log('Setting user name');
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
      onEvent={(event, error) => handleOnEvent(event, error)}
    >
      <Layout />
    </ReactKeycloakProvider>
  );
}

export default Authentication;
