import React from 'react';
// @material-ui/core components
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import AddIcon from '@material-ui/icons/Add';
// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import ReactFacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from 'react-facebook-login';
import FacebookIcon from '@material-ui/icons/Facebook';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
  Tooltip,
  Typography
} from '@material-ui/core';
import { useGetMyProfileQuery } from '../../api/saleseazeApi';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const connectToSocialAccountsStyle = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface DialogTitleProps
  extends WithStyles<typeof connectToSocialAccountsStyle> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const styles = createStyles({
  facebookIconStyle: {
    display: 'flex',
    flexDirection: 'column',
    '& .kep-login-facebook.metro': {
      width: '100%',
      borderRadius: 2,
      fontSize: '14px',
      fontWeight: 500,
      textTransform: 'none',
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      paddingRight: 10,
      '& svg': {
        margin: '10px 10px 10px 10px'
      }
    }
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardAction: {
    float: 'right',
    color: '#FFFFFF',
    marginTop: '0px'
  },
  cardTitle: {
    float: 'left',
    color: '#FFFFFF'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: 400,
      lineHeight: 1
    }
  }
});
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// const isLoginInfo = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): response is ReactFacebookLoginInfo =>

const DialogTitle = withStyles(connectToSocialAccountsStyle)(
  (props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  }
);

function SocialAccounts(props: any) {
  const { classes } = props;
  const { data, isLoading, error } = useGetMyProfileQuery();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const connectToSocialAccounts = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
  };
  const callback = (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {};
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>
                Connected Social Accounts
              </h4>
              <div className={classes.cardCategoryWhite}>
                Here is a list of all connected social accounts for
                {!isLoading && data && <div>{data.company?.companyName}</div>}
                {error && <div>N/A</div>}
              </div>
            </div>
            <div className={classes.cardAction}>
              <Tooltip title="Connect to Social Account">
                <IconButton
                  aria-label="connect to social accounts"
                  onClick={connectToSocialAccounts}
                >
                  <AddIcon style={{ color: purple[50] }} />
                </IconButton>
              </Tooltip>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={['Account Name', 'Provider', 'Connected On', 'Action']}
              tableData={[['Facebook', 'Facebook', '12/01/2021', 'Edit']]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        fullWidth={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="connect-social-account-title" onClose={handleClose}>
          {'Connect to Social Account'}
        </DialogTitle>
        <DialogContent dividers>
          <List className={classes.root} aria-label="contacts">
            <ListItem>
              <div id="facebookWrapper" className={classes.facebookIconStyle}>
                <ReactFacebookLogin
                  appId="1088597931155576"
                  callback={callback}
                  textButton="Sign in with Facebook"
                  icon={<FacebookIcon />}
                />
              </div>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
}

export default withStyles(styles)(SocialAccounts);
