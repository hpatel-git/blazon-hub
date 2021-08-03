import React, { useState, useEffect } from 'react';
// @material-ui/core components
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Poppers from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import { isUserRegistrationComplete } from '../../utils/userAttributeUtils';
import dropdownStyle from '../../assets/jss/material-dashboard-react/dropdownStyle';

import Notifications from '@material-ui/icons/Notifications';
import Button from '../CustomButtons/Button';
import { Link } from 'react-router-dom';
import keycloakConfig from '../../config/keycloakConfig';
import { KeycloakProfile } from 'keycloak-js';

function NavbarAlerts({ ...props }: any) {
  const { classes } = props;
  const [alertCount, setAlertCount] = useState<number>(0);
  const [isRegistrationCompleted, setRegistrationCompleted] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //const userProfile = useAppSelector((state) => state.auth.userProfile);
  useEffect(() => {
    keycloakConfig
      .loadUserProfile()
      .then(function (profile: KeycloakProfile) {
        const isCompleted = isUserRegistrationComplete(profile);
        setRegistrationCompleted(isCompleted);
        if (!isCompleted) {
          setAlertCount(alertCount + 1);
        }
      })
      .catch(function () {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Button
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={open ? 'menu-list-grow' : null}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.buttonLink}
      >
        <Notifications className={classes.icons} />
        {alertCount > 0 && (
          <span className={classes.notifications}>{alertCount}</span>
        )}
        <Hidden mdUp={true} implementation="css">
          <p className={classes.linkText}>Notification</p>
        </Hidden>
      </Button>
      <Poppers
        open={open}
        anchorEl={anchorEl}
        transition={true}
        disablePortal={true}
        className={
          classNames({ [classes.popperClose]: !open }) + ' ' + classes.pooperNav
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            // id="menu-list-grow"
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList role="menu">
                  {!isRegistrationCompleted && (
                    <MenuItem
                      component={Link}
                      to="/admin/user"
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      Please complete your registration
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </React.Fragment>
  );
}
export default withStyles(dropdownStyle)(NavbarAlerts);
