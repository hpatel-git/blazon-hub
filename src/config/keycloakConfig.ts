import Keycloak from 'keycloak-js';
import { Config } from './Config';

const keycloakConfig = Keycloak({
  url: `${Config.root.KEYCLOAK_BASE_URL}/auth`,
  realm: Config.root.REALM,
  clientId: Config.root.CLIENT_ID
});
export const isSaleseazeManager = () => {
  return keycloakConfig.hasRealmRole('SALESEAZE_MANAGER');
};
export const isSaleseazeSuperAdmin = () => {
  return keycloakConfig.hasRealmRole('SALESEAZE_SUPER_ADMIN');
};
export const isSaleseazeUser = () => {
  return keycloakConfig.hasRealmRole('SALESEAZE_USER');
};
export default keycloakConfig;
