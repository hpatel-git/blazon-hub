import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// core components
import AdminNavbarLinks from '../Navbars/AdminNavbarLinks';
import { useKeycloak } from '@react-keycloak/web';

import sidebarStyle from '../../assets/jss/material-dashboard-react/components/sidebarStyle';

const Sidebar = ({ ...props }) => {
  const { keycloak } = useKeycloak();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName: any) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes } = props;
  const handleLogout = () => {
    keycloak.logout();
  };
  var links = (
    <List className={classes.list}>
      {routes
        .filter((prop: any) => !prop.hidden)
        .map((prop: any, key: any) => {
          var activePro = ' ';
          var listItemClasses = classNames({
            [' ' + classes[color]]: activeRoute(prop.layout + prop.path)
          });

          const whiteFontClasses = classNames({
            [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          });
          return (
            <NavLink
              to={prop.layout + prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem
                button={true}
                className={classes.itemLink + listItemClasses}
              >
                {typeof prop.icon === 'string' ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  />
                )}
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="dashboard" className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp={true} implementation="css">
        <Drawer
          variant="temporary"
          anchor={'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks handleLogout={handleLogout} />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown={true} implementation="css">
        <Drawer
          anchor={'left'}
          variant="permanent"
          open={true}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(sidebarStyle)(Sidebar);
