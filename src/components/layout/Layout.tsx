import React from 'react';
import {
  ThemeProvider,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import HomePage from '../home/HomePage';
import Header from './Header';
import Keycloak from 'keycloak-js';
import { styles, theme, drawerWidth } from './LayoutTheme';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Config } from '../../config/Config';
import { AuthClientError, AuthClientEvent } from '@react-keycloak/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export interface PaperbaseProps extends WithStyles<typeof styles> {}

function Layout(props: PaperbaseProps) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const keycloak = Keycloak({
    url: `${Config.url.KEYCLOAK_BASE_URL}/auth`,
    realm: 'company-services',
    clientId: 'saleseaze-app'
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const loadingComponent = <div>Keycloak is loading</div>;
  const initOptions = { pkceMethod: 'S256' };
  const handleOnEvent = async (
    eventType: AuthClientEvent,
    error?: AuthClientError
  ) => {
    alert(eventType);
    if (eventType === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        console.log(keycloak);
        alert('Hey authencation done');
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
      <Router>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
              <Hidden smUp implementation="js">
                <Navigator
                  PaperProps={{ style: { width: drawerWidth } }}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                />
              </Hidden>
              <Hidden xsDown implementation="css">
                <Navigator PaperProps={{ style: { width: drawerWidth } }} />
              </Hidden>
            </nav>
            <div className={classes.app}>
              <Header onDrawerToggle={handleDrawerToggle} />
              <main className={classes.main}>
                <HomePage />
              </main>
              <footer className={classes.footer}>
                <Copyright />
              </footer>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default withStyles(styles)(Layout);
