import React from 'react';
// @material-ui/core components
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import { isUserRegistrationComplete } from '../../utils/userAttributeUtils';
import dropdownStyle from '../../assets/jss/material-dashboard-react/dropdownStyle';
import { useAppSelector } from '../../redux/hooks';

function NavbarAlerts({ ...props }: any) {
  const { classes, handleClose } = props;
  const userProfile = useAppSelector((state) => state.auth.userProfile);
  return (
    <Paper>
      <ClickAwayListener onClickAway={handleClose}>
        <MenuList role="menu">
          <MenuItem onClick={handleClose} className={classes.dropdownItem}>
            Mike John responded to your email
          </MenuItem>
          {isUserRegistrationComplete(userProfile) && (
            <MenuItem onClick={handleClose} className={classes.dropdownItem}>
              Please complete your registration
            </MenuItem>
          )}
        </MenuList>
      </ClickAwayListener>
    </Paper>
  );
}
export default withStyles(dropdownStyle)(NavbarAlerts);
