const prod = {
  root: {
    KEYCLOAK_BASE_URL: 'https://keycloak.herokuapp.com',
    REALM: 'company-services',
    CLIENT_ID: 'saleseaze-app'
  }
};

const dev = {
  root: {
    KEYCLOAK_BASE_URL: 'http://localhost:8080',
    REALM: 'company-services',
    CLIENT_ID: 'saleseaze-app'
  }
};

export const Config = process.env.NODE_ENV === 'development' ? dev : prod;
