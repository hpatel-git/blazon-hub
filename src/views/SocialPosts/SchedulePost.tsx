import React from 'react';
// @material-ui/core components

import {
  createStyles,
  Theme,
  makeStyles,
  WithStyles
} from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// core components
import GridContainer from '../../components/Grid/GridContainer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddAlert from '@material-ui/icons/AddAlert';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Slide
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Snackbar from '../../components/Snackbar/Snackbar';
import SchedulePostStepIcon, { ColorlibConnector } from './SchedulePostUtils';
import PostSettings from './PostSettings';
import AddPages from './AddPages';
import PostTicker from './PostTicker';
import { format, addMinutes } from 'date-fns';
import { usePublishPostMutation } from '../../api/saleseazeApi';
import PublishPostRequest from '../../api/model/publishPostRequest';
import FacebookPage from '../../api/model/facebookPage';

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
    actionBar: {
      flex: 1
    },
    floatLeft: {
      float: 'left'
    },
    floatRight: {
      float: 'right'
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
    .required('Post content is required')
});
function SchedulePost(props: SchedulePostProps) {
  const classes = useStyles();
  // yyyy-MM-ddThh:mm
  const [defaultTime] = React.useState(
    format(addMinutes(new Date(), 15), "yyyy-MM-dd'T'HH:mm")
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: '',
      ogImage: '',
      ogTitle: '',
      ogDescription: '',
      ogUrl: '',
      selectedPages: [],
      publishTime: defaultTime
    },
    validationSchema: validationSchema,
    validate: (values) => {},
    onSubmit: (values) => {}
  });
  const [publishPost, { isLoading: isUpdating }] = usePublishPostMutation();
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

  const handlePublish = async () => {
    try {
      const selectedPages = formik.values.selectedPages as FacebookPage[];
      const publishRequest: PublishPostRequest = {
        message: formik.values.content,
        publishTime: formik.values.publishTime,
        pageIds: selectedPages.map((item) => item.id),
        link: formik.values.ogUrl
      };
      await publishPost(publishRequest).unwrap();
      showSuccessMessage('Content Publish successfully');
      props.closeSchedulePost();
    } catch (e) {
      handleError(e, 'Error while publishing content');
    }
  };
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
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    formik.resetForm();
  };

  const isNextButtonDisabled = (): boolean => {
    if (!formik.dirty) {
      return true;
    }
    if (activeStep === 0 && Boolean(formik.errors.content)) {
      return true;
    }
    if (activeStep === 1 && formik.values.selectedPages.length === 0) {
      return true;
    }
    return false;
  };
  const handleOnClose = (event: object, reason: string) => {
    if (reason !== 'backdropClick') {
      props.closeSchedulePost();
    }
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
          onClose={handleOnClose}
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
            {isUpdating && <CircularProgress />}
            {activeStep === 0 && (
              <List aria-label="contacts" component="div">
                <ListItem component="div">
                  <PostSettings formik={formik} />
                </ListItem>
              </List>
            )}
            {activeStep === 1 && (
              <List aria-label="contacts" component="div">
                <ListItem component="div">
                  <AddPages formik={formik} />
                </ListItem>
              </List>
            )}
            {activeStep === 2 && (
              <List aria-label="contacts" component="div">
                <ListItem component="div">
                  <PostTicker formik={formik} />
                </ListItem>
              </List>
            )}
          </DialogContent>
          <DialogActions>
            <div className={classes.actionBar}>
              <div className={classes.floatRight}>
                <Tooltip title="Start Over Again">
                  <IconButton
                    onClick={handleReset}
                    color="primary"
                    className={classes.button}
                    aria-label="delete"
                  >
                    <RotateLeftIcon />
                  </IconButton>
                </Tooltip>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isNextButtonDisabled()}
                    onClick={handlePublish}
                    className={classes.button}
                  >
                    Publish
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isNextButtonDisabled()}
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </GridContainer>
    </form>
  );
}

export default SchedulePost;
