import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import AdminNavbarLinks from './AdminNavbarLinks';
import Button from '../CustomButtons/Button';
import { useKeycloak } from '@react-keycloak/web';

import headerStyle from '../../assets/jss/material-dashboard-react/components/headerStyle';

function Header({ ...props }: any) {
  function makeBrand() {
    var name;
    props.routes.map((prop: any, key: any) => {
      if (prop.layout + prop.path === props.location.pathname) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [' ' + classes[color]]: color
  });
  const { keycloak } = useKeycloak();
  const handleLogout = () => {
    keycloak.logout();
  };
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown={true} implementation="css">
          <AdminNavbarLinks handleLogout={handleLogout} />
        </Hidden>
        <Hidden mdUp={true} implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
export default withStyles(headerStyle)(Header);
