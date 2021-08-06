import React from 'react';
// @material-ui/core components

import {
  createStyles,
  Theme,
  makeStyles,
  WithStyles,
  withStyles
} from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// core components
import GridContainer from '../../components/Grid/GridContainer';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';
import AddAlert from '@material-ui/icons/AddAlert';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
  Typography
} from '@material-ui/core';
import { useRegisterSocialAccountMutation } from '../../api/saleseazeApi';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Snackbar from '../../components/Snackbar/Snackbar';
import SchedulePostStepIcon, { ColorlibConnector } from './SchedulePostUtils';
import PostSettings from './PostSettings';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
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
  })
);
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function getSteps() {
  return ['Select Post settings', 'Add pages', 'Schedule Post'];
}

interface SchedulePostProps {
  isOpen: boolean;
  closeSchedulePost: () => void;
}
const validationSchema = yup.object({
  content: yup
    .string()
    .min(3, 'Content should be of minimum 3 characters length')
    .required('Content is required')
});
function SchedulePost(props: SchedulePostProps) {
  const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: 'Welcome to Formik'
    },
    validationSchema: validationSchema,
    validate: (values) => {},
    onSubmit: (values) => {}
  });

  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  // Stepper details
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [registerSocialAccount, { isLoading }] =
    useRegisterSocialAccountMutation();

  const showSuccessMessage = (message: string) => {
    setIsSuccess(true);
    setSuccessMessage(message);
  };
  const handleError = (e: any, defaultMessage: string) => {
    if ('data' in e) {
      setErrorMessage(e.data.message);
    } else {
      setErrorMessage(defaultMessage);
    }
    setIsError(true);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <GridContainer>
        <Dialog
          open={props.isOpen}
          fullWidth={true}
          maxWidth={'lg'}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.closeSchedulePost}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Snackbar
            place="bc"
            color="success"
            icon={AddAlert}
            message={successMessage}
            open={isSuccess}
            closeNotification={() => {
              setIsSuccess(false);
              setSuccessMessage('');
            }}
            close={true}
          />
          <Snackbar
            place="bc"
            color="danger"
            icon={AddAlert}
            message={errorMessage}
            open={isError}
            closeNotification={() => {
              setIsError(false);
              setErrorMessage('');
            }}
            close={true}
          />
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={SchedulePostStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <DialogContent dividers>
            {activeStep === 0 && (
              <List aria-label="contacts">
                <ListItem>{isLoading && <CircularProgress />}</ListItem>
                <ListItem>
                  <PostSettings formik={formik} />
                </ListItem>
              </List>
            )}
          </DialogContent>
          <DialogActions>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              )}
            </div>
          </DialogActions>
        </Dialog>
      </GridContainer>
    </form>
  );
}

export default SchedulePost;
