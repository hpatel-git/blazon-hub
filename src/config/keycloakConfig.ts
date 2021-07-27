import Keycloak from 'keycloak-js';
import { Config } from './Config';

const keycloakConfig = Keycloak({
  url: `${Config.root.KEYCLOAK_BASE_URL}/auth`,
  realm: Config.root.REALM,
  clientId: Config.root.CLIENT_ID
});

export default keycloakConfig;
