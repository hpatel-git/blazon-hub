const prod = {
  root: {
    KEYCLOAK_BASE_URL: 'https://keycloak.herokuapp.com',
    REALM: 'Saleseaze',
    CLIENT_ID: 'saleseaze-app',
    SALESEAZE_API_BASE_URL: 'https://api.saleseaze.com/api/v1'
  }
};

const dev = {
  root: {
    KEYCLOAK_BASE_URL: 'http://localhost:8080',
    REALM: 'Saleseaze',
    CLIENT_ID: 'saleseaze-app',
    SALESEAZE_API_BASE_URL: 'http://localhost:8900/api/v1'
  }
};

export const Config = process.env.NODE_ENV === 'development' ? dev : prod;
